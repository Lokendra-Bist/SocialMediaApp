import { useState, useEffect } from "react";
import { fetchAllPosts } from "../services/PostsService";

export const usePostCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetchAllPosts();
      setPosts(response.data.content);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        setLoading(true);
        const response = await fetchAllPosts();
        setPosts(response.data.content);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    reloadPosts: loadPosts,
  };
};
