import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_BASE_URL = "http://127.0.0.1:5000/api/v1";

// ================= (Get workspace)
export const getWorkspace = async (work_id) => {
  const { data } = await axiosInstance.get(`/workspaces/${work_id}`);
  return data.data;
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
export async function joinWorkspace(workspaceId, data) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/workspaces/${workspaceId}/join`,
      data, // ده بقى: { userName, photo }
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
