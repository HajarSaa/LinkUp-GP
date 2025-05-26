import axiosInstance from "./axiosInstance";

export const sendMessage = async (type, id, content) => {
  const endpoint = type === "channel" ? "channels" : "conversations";

  try {
    const res = await axiosInstance.post(`/${endpoint}/${id}/messages`, {
      content,
    });
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
