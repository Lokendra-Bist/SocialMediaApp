import { savedPostApi } from "../api/savedPostApi";

export const savePostToFavourite = async (postId) => {
  try {
    const response = await savedPostApi.savePostToFavourite(postId);
    console.log("Post added to favourite: ", response.data);
    return response.data;
  } catch (err) {
    console.error("Error while adding the post to favourite: ", err);
    throw err;
  }
};

export const getSavedPosts = async (page = 0, size = 5) => {
  try {
    const response = await savedPostApi.getSavedPosts(page, size);
    console.log("Fetched saved posts: ", response.data);
    return response.data;
  } catch (err) {
    console.error("Error while fetching the saved posts: ", err);
    throw err;
  }
};
