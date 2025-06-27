import axiosInstance from "./axiosInstance";

export const searchMessages = async ({
  keyword,
  user,
  channel,
  conversation,
  startDate,
  endDate,
}) => {


  const params = {
    keyword,
    ...(user && { user }),
    ...(channel && { channel }),
    ...(conversation && { conversation }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  const { data } = await axiosInstance.get("/search", { params });

  return data.data.messages;
};
