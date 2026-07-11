import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNotification } from "../hooks/useNotification";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export const useNotificationSocket = () => {
  const { addNotification } = useNotification();
  const { token, isAuthenticated } = useAuth();

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
