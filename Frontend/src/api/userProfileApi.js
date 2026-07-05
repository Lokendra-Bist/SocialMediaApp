import { api } from "./axios";

export const getUserProfile = async () => {
  return await api.get("/api/user-profile/getMyProfile");
};
