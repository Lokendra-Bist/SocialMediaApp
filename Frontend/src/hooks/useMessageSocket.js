import { useEffect } from "react";
import { useConversation } from "./useConversation";
import { useMessage } from "./useMessage";
import { useSocket } from "./useSocket";
import toast from "react-hot-toast";

export const useMessageSocket = () => {
  const { client } = useSocket();

  const { addMessage } = useMessage();

  const { updateConversation } = useConversation();

  useEffect(() => {
    if (!client?.connected) return;
    const subscription = client.subscribe("/user/topic/messages", (message) => {
      const msg = JSON.parse(message.body);
      console.log("Chat Data: ", msg);
      addMessage(msg);

      updateConversation(msg);
    });

    return () => subscription.unsubscribe();
  }, [client]);
};
