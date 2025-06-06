import axiosInstance from "./axiosInstance";

// ====================(Get User Profile)
export const getUserProfile = async (profile_id) => {
  const { data } = await axiosInstance.get(`/userProfiles/${profile_id}`);
  return data.data;
};
