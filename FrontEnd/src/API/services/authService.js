import axiosInstance from "./axiosInstance";

export const signupService = async (userData) => {
  const { data } = await axiosInstance.post("/auth/signup", userData);
  return data.data;
};

export const loginService = async (userData) => {
  const { data } = await axiosInstance.post("/auth/login", userData);
  return data.data;
};

export const getMe = async (signal) => {
  const { data } = await axiosInstance.get("/users/me", { signal });
  return data.data;
};


export const logoutUser = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};