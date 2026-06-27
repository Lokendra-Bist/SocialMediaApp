import { CreatePostCard } from "../../components/post/CreatePostCard";
import LeftSidebar from "../../components/sidebar/LeftSidebar";

export const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <LeftSidebar />

      <div className="max-w-2xl mx-auto py-6 px-4">
        <CreatePostCard />

        <div className="mt-6 space-y-4"></div>
      </div>
    </div>
  );
};
