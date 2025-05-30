import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://link-up-beige.vercel.app/api/v1",
  withCredentials: true,
});

// ِAbort unwanted requests
// دا هيحسن performance

axiosInstance.interceptors.request.use((config) => {
  if (config.signal) {
    const controller = new AbortController();
    config.signal.addEventListener("abort", () => controller.abort());
    config.signal = controller.signal;
  }
  return config;
});

export default axiosInstance;
