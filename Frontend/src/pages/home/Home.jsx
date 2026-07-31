import { useEffect } from "react";
import { CreatePostCard } from "../../components/post/CreatePostCard";
import { FeedPostCard } from "../../components/post/FeedPostCard";
import { usePosts } from "../../hooks/usePosts";
import { fetchAllPosts } from "../../services/PostsService";
import { PostDetailModal } from "../../components/modal/PostDetailModal";
import { usePostModal } from "../../hooks/usePostModal";

export const Home = () => {
  const { posts, setPosts } = usePosts();

  const { open, selectedPost, openPost, closePost } = usePostModal();

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetchAllPosts();
      console.log("Fetched Posts: ", response.data);
      setPosts(response.data.content);
    };

    loadPosts();
  }, [setPosts]);

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

        <PostDetailModal open={open} post={selectedPost} onClose={closePost} />
      </div>
    </>
  );
};
