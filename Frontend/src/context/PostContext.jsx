import { createContext, useEffect, useState } from "react";
import { fetchAllPosts } from "../services/PostsService";
import { useAuth } from "../hooks/useAuth";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  const { token } = useAuth();

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (currentPage = 0) => {
    if (loading) return;
    try {
      setLoading(true);

      const response = await fetchAllPosts(currentPage);

      const data = response.data;

      setPosts((prev) =>
        currentPage === 0 ? data.content : [...prev, ...data.content],
      );

      setPage(currentPage);
      setHasMore(!data.last);
    } finally {
      setLoading(false);
    }
  };

  const loadNextPage = () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    loadPosts(nextPage);
  };

  useEffect(() => {
    if (!token) return;
    loadPosts(0);
  }, [token]);

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
        loading,
        hasMore,
        loadPosts,
        loadNextPage,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
