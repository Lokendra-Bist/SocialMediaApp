import { useEffect } from "react";
import { useComment } from "./useComment";
import { useSocket } from "./useSocket";
import { usePosts } from "./usePosts";

export const useCommentSocket = (postId) => {
  const { client, connected } = useSocket();

  const { addRealtimeComment } = useComment();
  const { updatePostCommentCount } = usePosts();

  useEffect(() => {
    if (!connected || !client) return;

    if (!postId) return;

    const subscription = client.subscribe(
      `/topic/comments/${postId}`,

      (message) => {
        const data = JSON.parse(message.body);
        console.log("useCommentSocket Data: ", data);
        addRealtimeComment(data);
        updatePostCommentCount(data.postId, data.commentsCount);
      },
    );

    return () => subscription.unsubscribe();
  }, [client, postId, connected]);
};
