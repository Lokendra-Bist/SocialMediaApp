import { api } from "./axios";

export const userApi = {
  searchUsers(query) {
    return api.get(`/api/users/search-users`, {
      params: { query },
    });
  },
};
