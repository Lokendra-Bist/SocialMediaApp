import { api } from "./axios";

export const followApi = {
  getFollower(page = 0, size = 5) {
    return api.get("/api/follow/get-follower", {
      params: {
        page,
        size,
      },
    });
  },

  getFollowing(page = 0, size = 5) {
    return api.get("/api/follow/get-following", {
      params: {
        page,
        size,
      },
    });
  },
};
