import axiosInstance from "./axiosInstance";

// ================= (Get workspace)
export const getWorkspace = async (work_id) => {
  const { data } = await axiosInstance.get(`/workspaces/${work_id}`);
  return data.data;
};
////////////////////////////////////////////////////////////////////
export const createWorkspaceService = async (name) => {
  const { data } = await axiosInstance.post(`/workspaces`, { name });
  return data.data;
};
////////////////////////////////////////////////////////////////////
export async function joinWorkspace(workspaceId, userName) {
  const { data } = await axiosInstance.post(`/workspaces/${workspaceId}/join`, {
    userName,
  });
  return data.data;
}
////////////////////////////////////////////////////////////////////
