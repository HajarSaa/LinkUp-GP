import axiosInstance from "./axiosInstance";

// =============(Get Later Items)
export const getGetLaterItems = async () => {
  const { data } = await axiosInstance.get(`/laterItems`);
  return data.data.laterItems;
};

//==============(Toggle the later item)
// Toggle save for later on a message
export const toggleLaterItem = async (messageId) => {
  const { data } = await axiosInstance.post(`/laterItems/${messageId}/toggle`);
  return data.data;
};