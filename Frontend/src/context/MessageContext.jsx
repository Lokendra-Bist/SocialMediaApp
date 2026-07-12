import { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const setConversation = (data) => {
    setMessages(data);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        setConversation,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
