import { useEffect, useState } from "react";
import { getSavedPosts } from "../services/SavedPostsService";

export const useSavedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadSavedPosts = async (currentPage) => {
    try {
      setLoading(true);
      const response = await getSavedPosts(currentPage);
      setPosts((prev) =>
        currentPage === 0
          ? response.data.content
          : [...prev, ...response.data.content],
      );
      setPage(response.data.number);
      setTotalPages(response.data.totalPages);
      setHasMore(!response.data.last);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedPosts(0);
  }, []);

  const loadNextPage = () => {
    if (loading || !hasMore) return;

    loadSavedPosts(page + 1);
  };

  return {
    posts,
    page,
    totalPages,
    loading,
    loadSavedPosts,
    hasMore,
    loadNextPage,
    setPage,
  };
};
