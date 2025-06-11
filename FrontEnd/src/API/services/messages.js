import axiosInstance from "./axiosInstance";

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
// ==============( Delete  message)===
export const deleteThisMessage = async (message_id) => {
  const { data } = await axiosInstance.delete(`/messages/${message_id}`);
  return data.data;
};
