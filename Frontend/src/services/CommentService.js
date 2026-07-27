import { commentApi } from "../api/commentApi";

export const addComments = async (postId, content) => {
  try {
    const response = await commentApi.addComment(postId, content);
    return response.data;
  } catch (err) {
    console.error("Error while adding comment", err);
    throw err;
  }
};

export const getComments = async (postId) => {
  try {
    const response = await commentApi.fetchComment(postId);
    return response.data;
  } catch (err) {
    console.error("Error while fetching comment", err);
    throw err;
  }
};
