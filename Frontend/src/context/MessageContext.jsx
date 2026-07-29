import { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prev) => {
      const exists = prev.some((m) => m.id === message.id);

      if (exists) return prev;

      return [...prev, message];
    });
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
