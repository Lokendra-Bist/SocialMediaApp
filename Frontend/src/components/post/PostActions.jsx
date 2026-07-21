import { FiHeart, FiMessageCircle, FiShare2 } from "react-icons/fi";

const ActionButton = ({ label, icon, count, className = "", ...props }) => {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {icon}
      {count !== undefined && <span>{Number(count).toLocaleString()}</span>}
      <span className="sr-only">{label}</span>
    </button>
  );
};

export const PostActions = ({
  liked,
  likesCount,
  commentsCount,
  isLiking,
  onLike,
  onComment,
  onShare,
}) => {
  return (
    <footer className="mt-5 flex gap-6 border-t border-slate-100 pt-4">
      <ActionButton
        label={liked ? "Unlike post" : "Like post"}
        count={likesCount}
        icon={<FiHeart size={20} fill={liked ? "currentColor" : "none"} />}
        onClick={onLike}
        disabled={isLiking}
        aria-pressed={liked}
        className={liked ? "text-red-500" : "text-slate-500 hover:text-red-500"}
      />

      <ActionButton
        label="Open comments"
        count={commentsCount}
        icon={<FiMessageCircle size={20} />}
        onClick={onComment}
        className="text-slate-500 hover:text-blue-500"
      />

      <ActionButton
        label="Share post"
        icon={<FiShare2 size={20} />}
        onClick={onShare}
        className="text-slate-500 hover:text-green-500"
      />
    </footer>
  );
};
