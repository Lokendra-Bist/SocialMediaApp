import { api } from "./axios";

export const commentApi = {
  addComment(postId, content) {
    return api.post(`/api/comments/${postId}`, content);
  },

  fetchComment(postId) {
    return api.get(`/api/comments/get-comments/${postId}`);
  },
};
