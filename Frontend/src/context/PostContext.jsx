import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  const updateMyPostLike = (postId, likesCount) => {
    setMyPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, likesCount } : post)),
    );
  };

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

    setMyPosts((prev) =>
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

  const updatePostCommentCount = (postId, commentsCount) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentsCount,
            }
          : post,
      ),
    );

    setMyPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentsCount,
            }
          : post,
      ),
    );
  };

  const updateOwnFavourite = (postId, saved) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              saved,
            }
          : post,
      ),
    );

    setMyPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              saved,
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
        updateMyPostLike,
        myPosts,
        setMyPosts,
        updatePostCommentCount,
        updateOwnFavourite,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
