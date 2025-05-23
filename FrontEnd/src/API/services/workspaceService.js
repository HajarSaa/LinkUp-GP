import axios from "axios";

const API_BASE_URL = "https://link-up-beige.vercel.app/api/v1";


export const getWorkspace = async (work_id) => {
  const axios_response = await axios.get(
    `${API_BASE_URL}/workspaces/${work_id}`,
    {
      withCredentials: true,
    }
  );
  const response = axios_response.data;
  return response.data;
};
