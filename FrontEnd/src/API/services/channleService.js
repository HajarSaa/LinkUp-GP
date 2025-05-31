import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_BASE_URL = "https://link-up-beige.vercel.app/api/v1";

export const getChannelData = async (channel_id) => {
  const {data} = await axiosInstance.get(`/channels/${channel_id}`);
  return data.data;
};

export const leaveThisChannel = async (channel_id) => {
  return axios.post(
    `${API_BASE_URL}/channels/${channel_id}/leave`,
    {},
    { withCredentials: true }
  );
};
