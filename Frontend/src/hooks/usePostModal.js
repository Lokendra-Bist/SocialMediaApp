import { useState, useCallback } from "react";

export const usePostModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openPost = useCallback((post) => {
    setSelectedPost(post);
    setOpen(true);
  }, []);

  const closePost = useCallback(() => {
    setOpen(false);
    setSelectedPost(null);
  }, []);

  return {
    open,
    selectedPost,
    openPost,
    closePost,
  };
};
