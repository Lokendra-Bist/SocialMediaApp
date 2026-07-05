import { FiHeart, FiMessageCircle, FiShare2 } from "react-icons/fi";
import { formatPostDate } from "../../utils/formatPostDate";

export const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-center gap-3">
        <img
          src={post.profileImageUrl}
          alt={post.firstName}
          className="w-11 h-11 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-slate-900">
            {post.firstName} {post.lastName}
          </h3>

          <p className="text-sm text-slate-500">
            {formatPostDate(post.createdAt)}
          </p>
        </div>
      </div>

      {post.content && (
        <p className="mt-4 text-slate-700 whitespace-pre-wrap">
          {post.content}
        </p>
      )}

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="mt-4 rounded-xl w-full object-cover max-h-[500px]"
        />
      )}

      <div className="flex gap-8 mt-5 border-t pt-4">
        <button className="flex items-center gap-2 text-slate-500 hover:text-red-500">
          <FiHeart size={20} />

          <span>{post.likesCount}</span>
        </button>

        <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500">
          <FiMessageCircle size={20} />

          <span>{post.commentsCount}</span>
        </button>

        <button className="flex items-center gap-2 text-slate-500 hover:text-green-500">
          <FiShare2 size={20} />
        </button>
      </div>
    </div>
  );
};
