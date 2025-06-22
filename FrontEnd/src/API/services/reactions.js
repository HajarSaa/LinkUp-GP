import axiosInstance from "./axiosInstance";

// ============(get Message Reactions)=======================
export const getMessageReactions = async (message_id) => {
  const { data } = await axiosInstance.get(`/reactions/${message_id}`);
  return data.data
}