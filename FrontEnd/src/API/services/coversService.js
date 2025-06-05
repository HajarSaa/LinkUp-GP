import axiosInstance from "./axiosInstance";

export const getConversData = async (conver_id) => {
  const { data } = await axiosInstance.get(`/conversations/${conver_id}`);
  return data.data;
};
