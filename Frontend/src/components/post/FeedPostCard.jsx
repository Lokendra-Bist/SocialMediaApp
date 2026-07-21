import toast from "react-hot-toast";
import { useLike } from "../../hooks/useLike";
import { PostCard } from "./PostCard";

export const FeedPostCard = ({
  post,
  onOpenComments,
  onSharePost,
  onAuthorClick,
}) => {
  const { handleLike, loadingLike } = useLike(post.id);

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
      onShare={() => onSharePost?.(post)}
      onAuthorClick={onAuthorClick}
    />
  );
};
