import axios from "axios";

const API_BASE_URL = "https://link-up-beige.vercel.app/api/v1";

export const getConversData = async (conver_id) => {
  try {
    console.log("Conversation ID:", conver_id);
    const axios_response = await axios.get(
      `${API_BASE_URL}/conversations/${conver_id}?page=1&limit=3`,
      {
        withCredentials: true,
      }
    );

    const response = axios_response.data;
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching Conversation:", error.response.data);
    return null;
  }
};
