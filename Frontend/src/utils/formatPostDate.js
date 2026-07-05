export const formatPostDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  let timeAgo = "";

  if (diffMinutes < 1) {
    timeAgo = "Just now";
  } else if (diffMinutes < 60) {
    timeAgo = `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    timeAgo = `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    timeAgo = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else {
    timeAgo = formattedDate;
  }

  return `${formattedDate} • ${timeAgo}`;
};
