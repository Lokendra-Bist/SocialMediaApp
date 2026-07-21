import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNotification } from "./useNotification";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useMessage } from "./useMessage";
import { useConversation } from "./useConversation";
import { usePosts } from "../hooks/usePosts";

export const useNotificationSocket = () => {
  const { addNotification } = useNotification();
  const { token, isAuthenticated } = useAuth();
  const { addMessage } = useMessage();
  const { updateConversation } = useConversation();

  const { updatePostLike } = usePosts();

  const clientRef = useRef(null);
  const handlersRef = useRef({});

  useEffect(() => {
    handlersRef.current = {
      addNotification,
      addMessage,
      updateConversation,
      updatePostLike,
    };
  }, [addNotification, addMessage, updateConversation, updatePostLike]);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:2058/WeLink/ws"),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,

      onConnect: () => {
        client.subscribe("/user/topic/notifications", (message) => {
          if (!message.body) return;

          const data = JSON.parse(message.body);
          handlersRef.current.addNotification(data);
          toast.success(`${data.senderName || "Someone"} liked your post! ❤️`);
        });

        client.subscribe("/user/topic/messages", (message) => {
          if (!message.body) return;

          const data = JSON.parse(message.body);

          handlersRef.current.addMessage(data);
          handlersRef.current.updateConversation(data);

          toast.success(`${data.senderName} sent you a message`);
        });

        client.subscribe("/topic/posts", (message) => {
          if (!message.body) return;

          const data = JSON.parse(message.body);

          handlersRef.current.updatePostLike(data.postId, data.likesCount);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      if (clientRef.current === client) clientRef.current = null;
    };
  }, [token, isAuthenticated]);
};
