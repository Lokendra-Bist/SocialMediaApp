import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";

export const PostCard = ({
  post,
  isLiking,
  onLike,
  onComment,
  onShare,
  onAuthorClick,
}) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <PostHeader post={post} onAuthorClick={onAuthorClick} />

      <PostContent content={post.content} imageUrl={post.imageUrl} />

      <PostActions
        liked={post.liked}
        likesCount={post.likesCount}
        commentsCount={post.commentsCount ?? 0}
        isLiking={isLiking}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
      />
    </article>
  );
};
