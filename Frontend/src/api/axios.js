import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:2058/WeLink",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
