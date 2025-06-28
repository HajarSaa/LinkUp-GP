import PropTypes from "prop-types";
import YoutubeVideoPreview from "./YoutubeVideoPreview/YoutubeVideoPreview";
import YoutubePlaylistPreview from "./YoutubePlaylistPreview/YoutubePlaylistPreview";
import GithubRepoPreview from "./GithubRepoPreview/GithubRepoPreview";
import GithubUserPreview from "./GithubUserPreview/GithubUserPreview";

const LinkPreview = ({ data, onDismiss }) => {
  const { type } = data;

  switch (type) {
    case "youtube_video":
      return <YoutubeVideoPreview data={data} onDismiss={onDismiss} />;
    case "youtube_playlist":
      return <YoutubePlaylistPreview data={data} onDismiss={onDismiss} />;
    case "github_repository":
      return <GithubRepoPreview data={data} onDismiss={onDismiss} />;
    case "github_user":
      return <GithubUserPreview data={data} onDismiss={onDismiss} />;
    default:
      return null;
  }
};

LinkPreview.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onDismiss: PropTypes.func,
};

export default LinkPreview;