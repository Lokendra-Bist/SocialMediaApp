import { CreatePostCard } from "../../components/post/CreatePostCard";
import { PostCard } from "../../components/post/PostCard";
import { usePosts } from "../../hooks/usePosts";

export const Home = () => {
  const { posts } = usePosts();

  return (
    <>
      <div className="space-y-6">
        <div className="sticky top-20 lg:top-6 z-20">
          <CreatePostCard />
        </div>

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};
