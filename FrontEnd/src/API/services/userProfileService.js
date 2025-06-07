import axiosInstance from "./axiosInstance";

// ====================(Get User Profile)
export const getUserProfile = async (profile_id) => {
  const { data } = await axiosInstance.get(`/userProfiles/${profile_id}`);
  return data.data;
};
// ====================(Update User Image)
export const updateUserImage = async (formData) => {
  const { data } = await axiosInstance.patch(
    "/userProfiles/updateUserImage",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.data;
};
