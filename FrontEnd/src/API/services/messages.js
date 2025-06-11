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
// ==============( get channel messages)===
export const getMessageThreads = async ({
  parent_id,
  pageParam = 1,
  limit,
}) => {
  const { data } = await axiosInstance.get(
    `/messages/thread/${parent_id}?limit=${20}&page=${1}`
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
// ================( Send Message in Channel or Convers)
export const sendMessage = async (type, id, messageContent) => {
  const endpoint = type === "channel" ? "channels" : "conversations";

  const { data } = await axiosInstance.post(
    `/${endpoint}/${id}/messages`,
    messageContent
  );

  return data.data;
};
