import toast from "react-hot-toast";
import { useLike } from "../../hooks/useLike";
import { PostCard } from "./PostCard";
import { useSavedPosts } from "../../hooks/useSavedPosts";

export const FeedPostCard = ({
  post,
  onOpenComments,
  onAuthorClick,
  onBookmarkSuccess,
}) => {
  const { handleLike, loadingLike } = useLike(post.id);
  const { handleFavourite } = useSavedPosts(post.id);

  const handleBookmark = async () => {
    const result = await handleFavourite();

    onBookmarkSuccess?.(result);
  };

  const onLike = async () => {
    try {
      await handleLike();
    } catch {
      toast.error("Could not update the like. Please try again.");
    }
  };

  return (
    <PostCard
      post={post}
      isLiking={loadingLike}
      onLike={onLike}
      onComment={() => onOpenComments?.(post)}
      onOpen={() => onOpenComments?.(post)}
      onAuthorClick={onAuthorClick}
      onBookmark={handleBookmark}
    />
  );
};
