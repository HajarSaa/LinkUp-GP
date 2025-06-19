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
// ====================(Upload Media)
export const uploadMedia = async ({ formData, onUploadProgress }) => {
  const { data } = await axiosInstance.post("/uploads/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
    withCredentials: true,
  });

  return data.data;
};
