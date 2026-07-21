import { api } from "../api/axios";

export const createUserPost = async (content) => {
  return await api.post("/api/posts/create-post", content);
};

export const getAllPosts = async (page = 0, size = 5) => {
  return await api.get(`/api/posts/get-all-posts?page=${page}&size=${size}`);
};

export const toggleLike = async (postId) => {
  return await api.post(`/api/likes/toggle-like/${postId}`);
};

export const getMyPosts = async (page = 0, size = 5) => {
  return await api.get(`/api/post/get-my-posts?page=${page}&size=${size}`);
};
