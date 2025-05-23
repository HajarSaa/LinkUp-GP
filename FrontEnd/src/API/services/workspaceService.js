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
////////////////////////////////////////////////////////////////////
export const createWorkspaceService = async (name) => {
  const response = await axios.post(
    `${API_BASE_URL}/workspaces`,
    { name },
    { withCredentials: true }
  );
  return response.data;
};
////////////////////////////////////////////////////////////////////
  export async function joinWorkspace(workspaceId, userName) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/workspaces/${workspaceId}/join`,
        { userName },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to join workspace.");
    }
  }
////////////////////////////////////////////////////////////////////
