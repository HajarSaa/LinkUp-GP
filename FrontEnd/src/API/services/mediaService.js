// ===================(Get Channel Media)

import axiosInstance from "./axiosInstance";

export const getChannelMedia = async (channel_id) => {
  const { data } = await axiosInstance.get(
    `/messages/channelMedia/${channel_id}`
  );
  return data.data;
};

// ===================(Get Convers Media)

export const getConversationMedia = async (conversation_id) => {
  const { data } = await axiosInstance.get(
    `/messages/conversationMedia/${conversation_id}`
  );
  return data.data;
};