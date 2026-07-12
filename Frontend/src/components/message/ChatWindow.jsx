import { useAuth } from "../../hooks/useAuth";
import { useMessage } from "../../hooks/useMessage";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

export const ChatWindow = ({ receiver }) => {
  const { messages } = useMessage();
  const { user } = useAuth();

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
