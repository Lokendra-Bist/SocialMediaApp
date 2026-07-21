import { useState } from "react";
import { togglePostLike } from "../services/PostsService";
import { usePosts } from "./usePosts";

export const useLike = (postId) => {
  const [loadingLike, setLoadingLike] = useState(false);

  const { updateOwnLike } = usePosts();

  const handleLike = async () => {
    if (loadingLike) return;

    try {
      setLoadingLike(true);
      const response = await togglePostLike(postId);

      updateOwnLike(postId, response.data.liked, response.data.totalLikesCount);
    } finally {
      console.log("Finally useLike");

      setLoadingLike(false);
    }
  };

  return {
    loadingLike,
    handleLike,
  };
};
