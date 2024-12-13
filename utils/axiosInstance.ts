import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      if (config.headers) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
