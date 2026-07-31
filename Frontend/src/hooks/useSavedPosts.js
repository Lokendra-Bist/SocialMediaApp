import { useEffect, useState } from "react";
import {
  getSavedPosts,
  savePostToFavourite,
} from "../services/SavedPostsService";
import { usePosts } from "./usePosts";

export const useSavedPosts = (postId) => {
  const { updateOwnFavourite } = usePosts();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFavourite = async () => {
    const res = await savePostToFavourite(postId);
    updateOwnFavourite(postId, res.data.saved);
    return res.data;
  };

  const loadSavedPosts = async (currentPage) => {
    try {
      setLoading(true);

      const response = await getSavedPosts(currentPage);
      setPosts(response.data.content);
      setPage(response.data.number);
      setTotalPages(response.data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedPosts(0);
  }, []);

  return {
    handleFavourite,
    posts,
    page,
    totalPages,
    loading,
    loadSavedPosts,
  };
};
