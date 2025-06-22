import axiosInstance from "./axiosInstance";

// ============(get Message Reactions)=======================

export const getMessageReactions = async (message_id) => {
  const { data } = await axiosInstance.get(`/reactions/${message_id}`);
  return data.data;
};

// ============(Create&Delete  Message Reactions  (toggle))=======================

// note for Alaa ❗
//✅ this endpoint send emoji if new and delete it if its exist for the same person ✅

export const toggleReaction = async (message_id, emoji) => {
  const { data } = await axiosInstance.post(`/reactions/${message_id}`, {
    emoji,
  });
  return data.data;
};
