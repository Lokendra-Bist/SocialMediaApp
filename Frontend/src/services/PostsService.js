import * as postApi from "../api/postApi";

export const createPost = async (postData) => {
  try {
    const response = await postApi.createUserPost(postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
