import * as postApi from "../api/postApi";

export const createPost = async (postData) => {
  try {
    const response = await postApi.createUserPost(postData);
    console.log("Post created successfully: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const fetchAllPosts = async (page = 0, size = 5) => {
  try {
    const response = await postApi.getAllPosts(page, size);
    console.log("Fetched all posts: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const togglePostLike = async (postId) => {
  try {
    const response = await postApi.toggleLike(postId);
    console.log("Toggled like for post: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

export const getMyPosts = async () => {
  try {
    const response = await postApi.getMyPosts();
    console.log("Fetched my posts: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
