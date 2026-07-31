import { api } from "./axios";

export const savedPostApi = {
  savePostToFavourite(postId) {
    return api.post(`/api/saved_posts/save-post/${postId}`);
  },

  getSavedPosts(page, size) {
    return api.get("/api/saved_posts/get-saved-posts", {
      params: {
        page,
        size,
      },
    });
  },
};
