import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
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
