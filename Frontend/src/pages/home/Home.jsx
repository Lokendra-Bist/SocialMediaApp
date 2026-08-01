import { CreatePostCard } from "../../components/post/CreatePostCard";
import { FeedPostCard } from "../../components/post/FeedPostCard";
import { usePosts } from "../../hooks/usePosts";
import { PostDetailModal } from "../../components/modal/PostDetailModal";
import { usePostModal } from "../../hooks/usePostModal";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export const Home = () => {
  const { posts, loading, hasMore, loadNextPage } = usePosts();

  const { open, selectedPost, openPost, closePost } = usePostModal();

  const observerRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadNextPage,
  });

  return (
    <>
      <div className="space-y-6">
        <div className="sticky top-20 lg:top-6 z-20">
          <CreatePostCard />
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <FeedPostCard key={post.id} post={post} onOpenComments={openPost} />
          ))}
        </div>

        <div ref={observerRef} className="h-10" />

        {loading && (
          <div className="text-center py-6">Loading more posts...</div>
        )}

        <PostDetailModal open={open} post={selectedPost} onClose={closePost} />
      </div>
    </>
  );
};
