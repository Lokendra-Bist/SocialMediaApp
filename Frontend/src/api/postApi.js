import { api } from "../api/axios";

export const createUserPost = async (content) => {
  return await api.post("/api/posts/create-post", content);
};
