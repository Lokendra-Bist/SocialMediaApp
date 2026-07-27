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

export const PostDetailModal = ({ open, post, onClose, onLike, isLiking }) => {
  if (!open || !post) return null;

  const { comments, setComments } = useComment();

  useCommentSocket(post?.id);

  useEffect(() => {
    if (!open || !post) return;

    const loadComments = async () => {
      const response = await getComments(post.id);
      setComments(response.data);
    };
    loadComments();
  }, [open, post]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4">
      <div className="relative bg-white rounded-2xl overflow-hidden w-full max-w-6xl h-[90vh] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow cursor-pointer"
        >
          <FiX size={24} />
        </button>

        <div className="grid grid-cols-2 h-full">
          {/* LEFT */}

          <div className="bg-black flex justify-center items-center">
            <img
              src={post.imageUrl}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* RIGHT */}

          <div className="flex flex-col">
            <div className="p-5 border-b">
              <PostHeader post={post} />
            </div>

            <div className="px-5 py-4 border-b">
              <PostContent content={post.content} imageUrl={null} />
            </div>

            <div className="px-5 border-b">
              <PostActions
                liked={post.liked}
                likesCount={post.likesCount}
                commentsCount={post.commentsCount}
                isLiking={isLiking}
                onLike={onLike}
                onComment={() => {}}
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              <CommentList comments={comments} />
            </div>

            <CommentInput posts={post} />
          </div>
        </div>
      </div>
    </div>
  );
};
