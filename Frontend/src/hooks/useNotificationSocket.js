import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNotification } from "../hooks/useNotification";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export const useNotificationSocket = () => {
  const { addNotification } = useNotification();

  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:2058/WeLink/ws"),

      reconnectDelay: 5000,

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        console.log("CONNECTED");

        client.subscribe("/user/queue/notifications", (message) => {
          console.log("MESSAGE RECEIVED");

          console.log(message.body);

          const notification = JSON.parse(message.body);

          addNotification(notification);

          toast.success(`${notification.senderName} liked your post ❤️`);
        });
      },
    });

    client.activate();

    return () => client.deactivate();
  }, []);
};
