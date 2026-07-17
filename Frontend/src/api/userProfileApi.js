import { api } from "./axios";

export const getUserProfile = async () => {
  return await api.get("/api/user-profile/getMyProfile");
};

export const getMyProfile = async () => {
  return await api.get("/api/user-profile/myProfile");
};
