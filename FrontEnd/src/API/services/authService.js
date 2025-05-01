import axios from "axios";

const API_BASE_URL = "https://link-up-beige.vercel.app/api/v1/auth";

export const signupService = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/signup`, userData);
  console.log(response);
  return response.data;
};

export const loginService = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/login`, userData);
  return response.data;
};
