import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";

export const PostCard = ({
  post,
  isLiking,
  onLike,
  onComment,
  onOpen,
  onAuthorClick,
  onBookmark,
}) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <PostHeader post={post} onAuthorClick={onAuthorClick} />

      <div onClick={onOpen} className="cursor-pointer">
        <PostContent content={post.content} imageUrl={post.imageUrl} />
      </div>

      <PostActions
        liked={post.liked}
        likesCount={post.likesCount}
        commentsCount={post.commentsCount ?? 0}
        isLiking={isLiking}
        onLike={onLike}
        onComment={onComment}
        onBookmark={onBookmark}
        saved={post.saved}
      />
    </article>
  );
};
