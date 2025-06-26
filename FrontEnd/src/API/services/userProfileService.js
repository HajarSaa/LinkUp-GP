import axiosInstance from "./axiosInstance";

// ====================(Update User Image)
// export const updateUserImage = async (formData) => {
//   const { data } = await axiosInstance.patch(
//     "/userProfiles/updateUserImage",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return data.data;
// };
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

  // ✅ Return only the photo URL string
  return data.data.userProfile.photo;
};


// ====================(Update User Profile)
export const updateUserProfile = async (user_data) => {
  const { data } = await axiosInstance.patch(
    "/userProfiles/updateMe",
    user_data
  );

  return data.data;
};
