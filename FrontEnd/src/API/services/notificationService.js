// src/API/utils/notificationAPI.js
import axios from "./axiosInstance";

export const fetchNotifications = async (type = "") => {
  const url = type ? `/notifications?type=${type}` : `/notifications`;
  const response = await axios.get(url);
  console.log("Fetching notifs from:", url);
  console.log("Full response:", response.data);
  return response.data.data.notifications;
};
