import { useEffect, useState } from "react";
import { getMyPosts } from "../services/PostsService";
import { usePosts } from "./usePosts";

export const useMyPosts = () => {
  const { myPosts, setMyPosts } = usePosts();
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPosts = async (page = 0) => {
    try {
      setLoading(true);

      const response = await getMyPosts(page);
      console.log("My Post: ", response.data);

      setMyPosts(response.data.content);
      setPageInfo(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return {
    posts: myPosts,
    pageInfo,
    loading,
    reloadPosts: loadPosts,
  };
};
