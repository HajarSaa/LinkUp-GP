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
    body
  );
  return data.data;
}

// ================= (Update workspace)
export async function updateWorkspace(workspaceId, body) {
  const { data } = await axiosInstance.patch(
    `/workspaces/${workspaceId}`,
    body
  );
  return data.data;
}
// ================= (Leave workspace)
export async function leaveWorkspace(workspaceId) {
  const { data } = await axiosInstance.post(`/workspaces/${workspaceId}/leave`);
  return data.data;
}
// ================= (Delete workspace)
export async function deleteWorkspace(workspaceId) {
  await axiosInstance.delete(`/workspaces/${workspaceId}`);
  return { deletedId: workspaceId };
}

// ===========================(Accept Invitaion)

export const acceptInvite = async (token) => {
  const { data } = await axiosInstance.post(`/workspaces/acceptInvite`, {
    token: token,
  });
  return data.data;
};
