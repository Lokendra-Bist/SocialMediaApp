import { userApi } from "../api/userApi";

export const searchUsers = async (text) => {
  try {
    const response = await userApi.searchUsers(text);
    console.log("Search users response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching the user", error);
    throw error;
  }
};
