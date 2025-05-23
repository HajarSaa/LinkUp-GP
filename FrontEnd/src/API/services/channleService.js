import axios from "axios";

const API_BASE_URL = "https://link-up-beige.vercel.app/api/v1";

export const getChannelData = async (channel_id) => {
  try {
    const axios_response = await axios.get(
      `${API_BASE_URL}/channels/${channel_id}?page=1&limit=3`,
      {
        withCredentials: true,
      }
    );

    const response = axios_response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching channel:", error.response.data);
    return null;
  }
};
