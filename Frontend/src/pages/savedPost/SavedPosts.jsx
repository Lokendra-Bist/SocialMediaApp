import { FeedPostCard } from "../../components/post/FeedPostCard";
import { usePostModal } from "../../hooks/usePostModal";
import { useSavedPosts } from "../../hooks/useSavedPosts";

export const SavedPosts = () => {
  const { posts, loading, page, totalPages, setPage, loadSavedPosts } =
    useSavedPosts();
  const { openPost } = usePostModal();

  const handleBookmarkSuccess = async (result) => {
    if (!result.saved) {
      await loadSavedPosts(page);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading saved posts...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        No saved posts.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {posts.map((post) => (
        <FeedPostCard
          key={post.id}
          post={post}
          onOpenComments={openPost}
          onBookmarkSuccess={handleBookmarkSuccess}
        />
      ))}

      <div className="flex justify-center gap-3 mt-6">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <span className="px-3 py-2">
          {page + 1} / {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};
