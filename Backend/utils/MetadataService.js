import axios from "axios";
import * as cheerio from "cheerio";
import AppError from "./appError.js";

// Type identifiers
const URL_TYPES = {
  YOUTUBE_VIDEO: "youtube_video",
  YOUTUBE_PLAYLIST: "youtube_playlist",
  GITHUB_REPO: "github_repository",
  GITHUB_USER: "github_user",
  GENERIC_LINK: "generic_link",
};

export class MetadataService {
  static async fetchMetadata(url, next) {
    try {
      const type = this.detectUrlType(url);

      switch (type) {
        case URL_TYPES.YOUTUBE_VIDEO:
          return await this.fetchYouTubeVideoMetadata(url);
        case URL_TYPES.YOUTUBE_PLAYLIST:
          return await this.fetchYouTubePlaylistMetadata(url);
        case URL_TYPES.GITHUB_REPO:
          return await this.fetchGitHubRepoMetadata(url);
        case URL_TYPES.GITHUB_USER:
          return await this.fetchGitHubUserMetadata(url);
        default:
          return await this.fetchGenericMetadata(url);
      }
    } catch (error) {
      return next(
        new AppError(
          `Failed to fetch metadata for ${url}: ${error.message}`,
          424
        )
      );
    }
  }

  // --- URL Type Detection ---
  static detectUrlType(url) {
    if (url.includes("youtube.com/watch") || url.includes("youtu.be/")) {
      return URL_TYPES.YOUTUBE_VIDEO;
    } else if (url.includes("youtube.com/playlist")) {
      return URL_TYPES.YOUTUBE_PLAYLIST;
    } else if (url.includes("github.com")) {
      const pathParts = url.split("github.com/")[1].split("/").filter(Boolean);
      return pathParts.length >= 2
        ? URL_TYPES.GITHUB_REPO
        : URL_TYPES.GITHUB_USER;
    } else {
      return URL_TYPES.GENERIC_LINK;
    }
  }

  // --- YouTube Video ---
  static async fetchYouTubeVideoMetadata(url) {
    // Extract video ID (works for both URL formats)
    const videoId = url.includes("youtu.be/")
      ? url.split("youtu.be/")[1].split(/[?&#]/)[0]
      : new URL(url).searchParams.get("v");

    if (!videoId) throw new Error("Invalid YouTube URL");

    // Get video metadata (optional)
    const response = await axios.get(
      `https://www.youtube.com/oembed?url=https://youtube.com/watch?v=${videoId}&format=json`
    );
    const { title, author_name, thumbnail_url } = response.data;

    return {
      type: "youtube_video",
      url,
      videoId, // Critical for frontend embedding
      title,
      channel: author_name,
      thumbnail: thumbnail_url,
      embeddable: true, // Explicit flag for frontend
    };
  }

  // --- YouTube Playlist ---
  static async fetchYouTubePlaylistMetadata(url) {
    const response = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(response.data);

    return {
      type: URL_TYPES.YOUTUBE_PLAYLIST,
      url,
      title: $('meta[property="og:title"]').attr("content"),
      description: $('meta[property="og:description"]').attr("content"),
      video_count: $('meta[property="og:video:count"]').attr("content"),
      channel: $('link[itemprop="name"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
    };
  }

  // --- GitHub Repository ---
  static async fetchGitHubRepoMetadata(url) {
    const [owner, repo] = url.split("github.com/")[1].split("/");
    const { data } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
      }
    );

    const languages = await axios
      .get(data.languages_url)
      .then((res) => Object.keys(res.data).join(", "))
      .catch(() => "Unknown");

    return {
      type: URL_TYPES.GITHUB_REPO,
      url,
      title: data.full_name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      license: data.license?.spdx_id,
      languages,
      owner: {
        username: data.owner.login,
        avatar: data.owner.avatar_url,
      },
      last_updated: data.updated_at,
    };
  }

  // --- GitHub User ---
  static async fetchGitHubUserMetadata(url) {
    const username = url.split("github.com/")[1].split("/")[0];
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
      }
    );

    return {
      type: URL_TYPES.GITHUB_USER,
      url,
      username: data.login,
      name: data.name,
      bio: data.bio,
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      company: data.company,
      location: data.location,
      avatar: data.avatar_url,
      created_at: data.created_at,
    };
  }

  // --- Generic Link ---
  static async fetchGenericMetadata(url) {
    const response = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(response.data);

    return {
      type: URL_TYPES.GENERIC_LINK,
      url,
      title:
        $('meta[property="og:title"]').attr("content") || $("title").text(),
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
      site_name: $('meta[property="og:site_name"]').attr("content"),
    };
  }

  static extractLinks(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  }
}
