import axiosInstance from "./axiosInstance";

// ===============Get Channel Data========================================
export const getChannelData = async (channel_id) => {
  const { data } = await axiosInstance.get(`/channels/${channel_id}`);
  return data.data;
};
// ===============Join Channel ========================================
export const joinThisChannel = async (channel_id) => {
  return axiosInstance.post(`/channels/${channel_id}/join`, {});
};
// ===============Leave Channel ========================================
export const leaveThisChannel = async (channel_id) => {
  return axiosInstance.post(`/channels/${channel_id}/leave`, {});
};
// ===============Create Channel ========================================
export const createChannel = async (channel_data) => {
  const { data } = await axiosInstance.post(`/channels`, channel_data);
  return data.data;
};
// ===============Delete Channel ========================================
export const deleteThisChannel = async (channel_id) => {
  const { data } = await axiosInstance.delete(`/channels/${channel_id}`);
  return data.data;
};
// ===============Browse Channels ========================================
export const browseChannels = async () => {
  const { data } = await axiosInstance.get(`/channels`);
  return data.data;
};
// ===============update Channels ========================================
export const updateChannel = async (channel_id, body) => {
  const { data } = await axiosInstance.patch(`/channels/${channel_id}`, body);
  return data.data;
};
