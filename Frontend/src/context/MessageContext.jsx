import { createContext, useState } from "react";
import { useConversation } from "../hooks/useConversation";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const { selectedConversation } = useConversation();

  const addMessage = (message) => {
    if (!selectedConversation) return;

    const belongsToCurrentChat =
      message.senderId === selectedConversation.id ||
      message.receiverId === selectedConversation.id;

    if (!belongsToCurrentChat) {
      return;
    }

    setMessages((prev) => [...prev, message]);
  };

  const loadConversation = (conversation) => {
    setMessages(conversation);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        loadConversation,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
