import axiosClient from "axios";

const axios = axiosClient.create({
  baseURL: "http://localhost:8000/api/v1",
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
