import axiosInstance from "./axiosInstance";


// Get Channel
export const getChannelData = async (channel_id) => {
  const { data } = await axiosInstance.get(`/channels/${channel_id}`);
  return data.data;
};
// leave Channel ========================================
export const leaveThisChannel = async (channel_id) => {
  return axiosInstance.post(`/channels/${channel_id}/leave`, {});
};
// ==============( get channel messages)===
export const getChannelMessages = async ({
  channel_id,
  pageParam = 1,
  limit,
}) => {
  const { data } = await axiosInstance.get(
    `/messages/channelMessages/${channel_id}?limit=${limit}&page=${pageParam}`
  );

  return {
    data: data.data.messages,
    currentPage: pageParam,
    limit,
    hasNextPage: data.data.messages.length === limit,
  };
};
