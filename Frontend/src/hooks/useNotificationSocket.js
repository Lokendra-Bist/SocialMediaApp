import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNotification } from "./useNotification";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useMessage } from "./useMessage";
import { useConversation } from "./useConversation";

export const useNotificationSocket = () => {
  const { addNotification } = useNotification();
  const { token, isAuthenticated } = useAuth();

  const { addMessage } = useMessage();
  const { updateConversation } = useConversation();

  const clientRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    console.log("Initializing secure STOMP connection...");

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:2058/WeLink/ws"),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (msg) => console.log("STOMP Debug:", msg),

      onConnect: () => {
        console.log("WebSocket connected successfully!");

        client.subscribe("/user/topic/notifications", (message) => {
          if (message.body) {
            const data = JSON.parse(message.body);
            console.log("Real-time Notification Received:", data);

            addNotification(data);

            toast.success(
              `${data.senderName || "Someone"} liked your post! ❤️`,
            );
          }
        });

        client.subscribe("/user/topic/messages", (message) => {
          const data = JSON.parse(message.body);

          console.log("New Message", data);

          addMessage(data);
          updateConversation(data);
          toast.success(`${data.senderName} sent you a message`);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        console.log("Disconnecting WebSocket...");
        clientRef.current.deactivate();
      }
    };
  }, [token, isAuthenticated, addNotification]);
};
