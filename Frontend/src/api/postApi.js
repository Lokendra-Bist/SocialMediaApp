import { api } from "../api/axios";

export const createUserPost = async (content) => {
  return await api.post("/api/posts/create-post", content);
};

export const getAllPosts = async (page = 0, size = 5) => {
  return await api.get(`/api/posts/get-all-posts?page=${page}&size=${size}`);
};
