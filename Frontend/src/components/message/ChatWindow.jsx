import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useMessage } from "../../hooks/useMessage";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { getChatHistory } from "../../services/MessageService";

export const ChatWindow = ({ receiver }) => {
  const { messages, loadConversation } = useMessage();
  const { user } = useAuth();

  useEffect(() => {
    const fetchConversation = async () => {
      const res = await getChatHistory(receiver.id);

      loadConversation(res.data);
    };

    fetchConversation();
  }, [receiver.id]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            mine={message.senderId === user.id}
          />
        ))}
      </div>

      <MessageInput receiverId={receiver.id} />
    </div>
  );
};
