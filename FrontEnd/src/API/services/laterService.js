import axiosInstance from "./axiosInstance";

// =============(Get Later Items)
export const getGetLaterItems = async () => {
  const { data } = await axiosInstance.get(`/laterItems`);
  return data.data.laterItems;
};