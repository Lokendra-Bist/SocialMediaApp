import { formatPostDate } from "../../utils/formatPostDate";

export const PostHeader = ({ post, onAuthorClick }) => {
  const authorName = `${post.firstName ?? ""} ${post.lastName ?? ""}`.trim();

  const header = (
    <>
      <img
        src={post.profileImageUrl}
        alt={`${authorName}'s profile`}
        className="h-11 w-11 rounded-full object-cover"
      />

      <div>
        <h3 className="font-semibold text-slate-900">
          {authorName || "Unknown user"}
        </h3>

        <time dateTime={post.createdAt} className="text-sm text-slate-500">
          {formatPostDate(post.createdAt)}
        </time>
      </div>
    </>
  );

  if (!onAuthorClick) {
    return <header className="flex items-center gap-3">{header}</header>;
  }

  return (
    <header>
      <button
        type="button"
        onClick={() => onAuthorClick(post.userId)}
        className="flex items-center gap-3 text-left"
      >
        {header}
      </button>
    </header>
  );
};
