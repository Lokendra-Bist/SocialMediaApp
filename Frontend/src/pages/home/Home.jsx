import LeftSidebar from "../../components/sidebar/LeftSidebar";
import { CreatePostCard } from "../../components/post/CreatePostCard";
import { PostCard } from "../../components/post/PostCard";
import { usePostCard } from "../../hooks/usePostCard";

export const Home = () => {
  const { posts } = usePostCard();

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <LeftSidebar />

        <main className="flex-1 lg:ml-72 pt-20 lg:pt-6">
          <div className="max-w-2xl mx-auto px-4 space-y-6">
            <div className="sticky top-20 lg:top-6 z-20">
              <CreatePostCard />
            </div>

            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};
