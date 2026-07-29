import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useNotification } from "../hooks/useNotification";

export const useNotificationSocket = () => {
  const { client, connected } = useSocket();

  const { addNotification } = useNotification();

  useEffect(() => {
    if (!connected || !client) return;

    const subscription = client.subscribe(
      "/user/topic/notifications",
      (message) => {
        const notification = JSON.parse(message.body);

        addNotification(notification);
      },
    );

    return () => subscription.unsubscribe();
  }, [client, connected]);
};
