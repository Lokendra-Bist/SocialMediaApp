import { savePostToFavourite } from "../services/SavedPostsService";
import { usePosts } from "./usePosts";

export const useFavourite = (postId) => {
  const { updateOwnFavourite } = usePosts();

  const handleFavourite = async () => {
    const res = await savePostToFavourite(postId);

    updateOwnFavourite(postId, res.data.saved);

    return res.data;
  };

  return { handleFavourite };
};
