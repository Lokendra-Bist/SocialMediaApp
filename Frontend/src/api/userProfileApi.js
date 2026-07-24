import { api } from "./axios";

export const getUserProfile = async () => {
  return await api.get("/api/user-profile/getMyProfile");
};

export const getMyProfile = async () => {
  return await api.get("/api/user-profile/myProfile");
};

export const uploadUserProfile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await api.post("/api/user-profile/upload-profile", formData);
};
