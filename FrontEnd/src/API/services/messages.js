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
// ==============( get Converses messages)===
export const getConversMessages = async ({
  convers_id,
  pageParam = 1,
  limit,
}) => {
  const { data } = await axiosInstance.get(
    `/messages/conversationMessages/${convers_id}?limit=${limit}&page=${pageParam}`
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
// ================( Send Message in Channel or Convers)
export const updateThisMessage = async (message_id, content) => {
  const { data } = await axiosInstance.patch(`/messages/${message_id}`, content);
  return data.data;
};

// ================(Pin or Unpin a message)
export const togglePinMessage = async ({ messageId, pin }) => {
  const { data } = await axiosInstance.patch(
    `/messages/${messageId}/pin?pin=${pin}`
  );
  return data.data;
};
// ================(Get Pinned Channel Messages)
// Get pinned messages for a channel with pagination

export const getChannelPinnedMessages = async ({ channelId, limit = 10, page = 1 }) => {
  const { data } = await axiosInstance.get(
    `/messages/channelPinnedMessages/${channelId}?limit=${limit}&page=${page}`
  );
  return {
    data: data.data,
    currentPage: data.currentPage,
    hasNextPage: data.hasNextPage,
  };
};


// ================(Get Pinned Conversation Messages)
// Get conversation messages with pagination
export const getConversationPinnedMessages = async ({
  conversationId,
  limit = 10,
  page = 1,
}) => {
  const { data } = await axiosInstance.get(
    `/messages/conversationPinnedMessages/${conversationId}?limit=${limit}&page=${page}`
  );

  return {
    data: data.data,
    currentPage: data.currentPage,
    hasNextPage: data.hasNextPage,
  };
};
