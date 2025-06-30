import axiosInstance from "./axiosInstance";

// =============(Get Later Items)
export const getGetLaterItems = async () => {
  const { data } = await axiosInstance.get(`/laterItems`);
  return data.data.laterItems;
};

//==============(Toggle the later item)
// Toggle save for later on a message
export const toggleLaterItem = async (messageId) => {
  const { data } = await axiosInstance.patch(
    `/laterItems/${messageId}/toggle`,
    {}
  );
  return data.data;
};
// =============(Set Reminder on a Later Item)
export const setReminder = async ({ messageId, reminderAt }) => {
  const { data } = await axiosInstance.patch(
    `/laterItems/${messageId}/setReminder`,
    { reminderAt }
  );
  return data.data;
};

// =============(Remove Reminder from a Later Item)
export const removeReminder = async (messageId) => {
  const { data } = await axiosInstance.patch(
    `/laterItems/${messageId}/removeReminder`
  );
  return data.data;
};
// =============(Update Later Item Status)
export const updateLaterItemStatus = async ({ messageId, status }) => {
  const { data } = await axiosInstance.patch(
    `/laterItems/${messageId}/status`,
    { status }
  );
  return data.data;
};