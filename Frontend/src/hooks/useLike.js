import { useState } from "react";
import { togglePostLike } from "../services/PostsService";

export const useLike = (post) => {
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [loadingLike, setLoadingLike] = useState(false);

  const handleLike = async () => {
    if (loadingLike) return;

    setLoadingLike(true);

    const previousLiked = liked;

    setLiked(!previousLiked);
    setLikesCount((prev) => (previousLiked ? prev - 1 : prev + 1));

    try {
      await togglePostLike(post.id);
    } catch (err) {
      Error("Error toggling like:", err);
      setLiked(previousLiked);
      setLikesCount((prev) => (previousLiked ? prev + 1 : prev - 1));
    } finally {
      setLoadingLike(false);
    }
  };

  return {
    liked,
    likesCount,
    loadingLike,
    handleLike,
  };
};
