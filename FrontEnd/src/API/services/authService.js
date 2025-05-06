import axios from "axios";

const API_BASE_URL = "https://link-up-beige.vercel.app/api/v1";

export const signupService = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData, {
    withCredentials: true,
  });
  return response.data;
};

export const loginService = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
    withCredentials: true,
  });
  return response.data;
};

export const getMeService = async () => {
  const response = await axios.get(`${API_BASE_URL}/users/me`, {
    withCredentials: true,
  });
  return response.data;
};
