import { useEffect } from "react";
import { useComment } from "./useComment";
import { useSocket } from "./useSocket";

export const useCommentSocket = (postId) => {
  const { client, connected } = useSocket();

  const { addRealtimeComment } = useComment();

  useEffect(() => {
    if (!connected || !client) return;

    if (!postId) return;

    const subscription = client.subscribe(
      `/topic/comments/${postId}`,

      (message) => {
        const data = JSON.parse(message.body);
        addRealtimeComment(data);
      },
    );

    return () => subscription.unsubscribe();
  }, [client, postId, connected]);
};
