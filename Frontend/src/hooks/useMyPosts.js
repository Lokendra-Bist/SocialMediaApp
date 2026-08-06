import { useEffect, useState } from "react";
import { getMyPosts } from "../services/PostsService";
import { usePosts } from "./usePosts";

export const useMyPosts = () => {
  const { myPosts, setMyPosts } = usePosts();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (currentPage = 0) => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await getMyPosts(currentPage);

      setMyPosts((prev) =>
        currentPage === 0
          ? response.data.content
          : [...prev, ...response.data.content],
      );

      setPage(response.data.number);
      setHasMore(!response.data.last);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(0);
  }, []);

  const loadNextPage = async () => {
    if (loading || !hasMore) return;

    await loadPosts(page + 1);
  };

  return {
    posts: myPosts,
    loading,
    hasMore,
    loadNextPage,
    reloadPosts: () => loadPosts(0),
  };
};
