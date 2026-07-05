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
