import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const updateOwnLike = (postId, liked, likesCount) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked,
              likesCount,
            }
          : post,
      ),
    );
  };

  const updatePostLike = (postId, likesCount) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likesCount,
            }
          : post,
      ),
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        updatePostLike,
        updateOwnLike,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
