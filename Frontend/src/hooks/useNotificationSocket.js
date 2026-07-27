import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSocket } from "../hooks/useSocket";
import { useNotification } from "../hooks/useNotification";

export const useNotificationSocket = () => {
  const { client } = useSocket();

  const { addNotification } = useNotification();

  useEffect(() => {
    if (!client?.connected) return;

    const subscription = client.subscribe(
      "/user/topic/notifications",

      (message) => {
        const notification = JSON.parse(message.body);

        addNotification(notification);

        toast.success(`${notification.senderName} liked your post`);
      },
    );

    return () => subscription.unsubscribe();
  }, [client]);
};
