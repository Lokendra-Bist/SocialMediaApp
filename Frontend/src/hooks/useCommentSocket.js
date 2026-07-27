import { useEffect } from "react";
import { useComment } from "./useComment";
import { useSocket } from "./useSocket";

export const useCommentSocket = (postId) => {
  const { client } = useSocket();

  const { addRealtimeComment } = useComment();

  useEffect(() => {
    if (!client?.connected) return;

    if (!postId) return;

    const subscription = client.subscribe(
      `/topic/comments/${postId}`,

      (message) => {
        addRealtimeComment(JSON.parse(message.body));
      },
    );

    return () => subscription.unsubscribe();
  }, [client, postId]);
};
