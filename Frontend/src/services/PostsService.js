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

export const fetchAllPosts = async () => {
  try {
    const response = await postApi.getAllPosts();
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const togglePostLike = async (postId) => {
  try {
    const response = await postApi.toggleLike(postId);
    console.log("TooglePostLike in service", response.data);
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

export const getMyPosts = async () => {
  try {
    const response = await postApi.getMyPosts();
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
