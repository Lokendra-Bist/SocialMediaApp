import * as userProfileApi from "../api/userProfileApi";

export const getMyProfile = async () => {
  try {
    const response = await userProfileApi.getUserProfile();
    console.log("Fetched user profile:", response.data);
    return await response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const fetchMyOwnProfile = async () => {
  try {
    const response = await userProfileApi.getMyProfile();
    console.log("Fetched user profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const uploadUserProfile = async (file) => {
  try {
    const response = await userProfileApi.uploadUserProfile(file);
    return response.data;
  } catch (error) {
    console.error("Error uploading user profile:", error);
    throw error;
  }
};

export const uploadCoverImage = async (image) => {
  try {
    const response = await userProfileApi.uploadCover(image);
    return response.data;
  } catch (error) {
    console.error("Error uploading cover photo:", error);
    throw error;
  }
};
