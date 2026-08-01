import { useEffect, useRef } from "react";

export const useInfiniteScroll = ({ loading, hasMore, onLoadMore }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: null,
        threshold: 0.5,
        rootMargin: "150px",
      },
    );

    const current = observerRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [loading, hasMore, onLoadMore]);

  return observerRef;
};
