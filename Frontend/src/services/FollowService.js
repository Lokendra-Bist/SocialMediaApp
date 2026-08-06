import { followApi } from "../api/followApi";

export const fetchFollowers = async (page = 0, size = 5) => {
  try {
    const response = await followApi.getFollower(page, size);
    console.log("Fetched followers:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
};

export const fetchFollowing = async (page = 0, size = 5) => {
  try {
    const response = await followApi.getFollowing(page, size);
    console.log("Fetched followings:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching followings:", error);
    throw error;
  }
};
