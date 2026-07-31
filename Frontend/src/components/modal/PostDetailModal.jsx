import { FiX } from "react-icons/fi";
import { PostHeader } from "../post/PostHeader";
import { PostContent } from "../post/PostContent";
import { PostActions } from "../post/PostActions";
import { CommentList } from "./CommentList";
import { CommentInput } from "./CommentInput";
import { useEffect } from "react";
import { useComment } from "../../hooks/useComment";
import { useCommentSocket } from "../../hooks/useCommentSocket";
import { getComments } from "../../services/CommentService";
import toast from "react-hot-toast";
import { useLike } from "../../hooks/useLike";
import { usePosts } from "../../hooks/usePosts";
import { useSavedPosts } from "../../hooks/useSavedPosts";

export const PostDetailModal = ({ open, post, onClose }) => {
  if (!open || !post) return null;

  const { comments, setComments } = useComment();

  useCommentSocket(post?.id);

  const { posts, myPosts } = usePosts();

  const currentPost =
    posts.find((p) => p.id === post.id) ||
    myPosts.find((p) => p.id === post.id) ||
    post;

  const { handleLike, loadingLike } = useLike(currentPost.id);

  const { handleFavourite } = useSavedPosts(currentPost.id);

  const onLike = async () => {
    try {
      await handleLike();
    } catch {
      toast.error("Could not update the like. Please try again.");
    }
  };

  useEffect(() => {
    if (!open || !post) return;

    setComments([]);

    const loadComments = async () => {
      const response = await getComments(post.id);
      setComments(response.data);
    };
    loadComments();
  }, [open, post]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative flex h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 shadow"
        >
          <FiX size={22} />
        </button>

        <div className="border-b px-5 py-4">
          <PostHeader post={currentPost} />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-4">
            {post.content && (
              <PostContent content={currentPost.content} imageUrl={null} />
            )}
          </div>
          {currentPost.imageUrl && (
            <div className="bg-black">
              <img
                src={currentPost.imageUrl}
                alt=""
                className="max-h-[500px] w-full object-contain"
              />
            </div>
          )}
          <div className="border-b px-5 py-3">
            <PostActions
              liked={currentPost.liked}
              likesCount={currentPost.likesCount}
              commentsCount={currentPost.commentsCount}
              isLiking={loadingLike}
              onLike={onLike}
              onComment={() => {}}
              saved={currentPost.saved}
              onBookmark={handleFavourite}
            />
          </div>

          <CommentList comments={comments} />
        </div>

        <div className="border-t bg-white p-4">
          <CommentInput posts={currentPost} />
        </div>
      </div>
    </div>
  );
};
