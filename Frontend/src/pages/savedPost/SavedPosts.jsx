import { PostDetailModal } from "../../components/modal/PostDetailModal";
import { FeedPostCard } from "../../components/post/FeedPostCard";
import { usePostModal } from "../../hooks/usePostModal";
import { useSavedPosts } from "../../hooks/useSavedPosts";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export const SavedPosts = () => {
  const { posts, loading, page, loadSavedPosts, hasMore, loadNextPage } =
    useSavedPosts();
  const { open, selectedPost, openPost, closePost } = usePostModal();

  const handleBookmarkSuccess = async (result) => {
    if (!result.saved) {
      await loadSavedPosts(page);
    }
  };

  const observerRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadNextPage,
  });

  if (loading && posts.length === 0) {
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

      <div ref={observerRef} className="h-10" />

      {loading && <div className="text-center py-6">Loading more posts...</div>}

      <PostDetailModal open={open} post={selectedPost} onClose={closePost} />
    </div>
  );
};
