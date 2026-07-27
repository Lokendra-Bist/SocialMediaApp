import { useEffect } from "react";
import { usePosts } from "./usePosts";
import { useSocket } from "./useSocket";

export const usePostSocket = () => {
  const { client } = useSocket();

  const { updatePostLike, updateMyPostLike } = usePosts();

  useEffect(() => {
    if (!client?.connected) return;

    const subscription = client.subscribe(
      "/topic/posts",

      (message) => {
        const data = JSON.parse(message.body);

        updatePostLike(
          data.postId,

          data.likesCount,
        );

        updateMyPostLike(
          data.postId,

          data.likesCount,
        );
      },
    );

    return () => subscription.unsubscribe();
  }, [client]);
};
