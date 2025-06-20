import axiosInstance from "./axiosInstance";

// ================= (Get workspace)
export const getWorkspace = async (work_id) => {
  const { data } = await axiosInstance.get(`/workspaces/${work_id}`);
  return data.data;
};
// ================= (Create workspace)
export const createWorkspaceService = async (work_name) => {
  const { data } = await axiosInstance.post(`/workspaces`, {
    name: work_name,
  });
  return data.data;
};

// ================= (Join workspace)
export async function joinWorkspace(workspaceId, body) {
  const { data } = await axiosInstance.post(
    `/workspaces/${workspaceId}/join`,
    body,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data.data;
}

// ================= (Update workspace)
export async function updateWorkspace(workspaceId, body) {
  const { data } = await axiosInstance.patch(
    `/workspaces/${workspaceId}`,
    body,
  );
  return data.data;
}