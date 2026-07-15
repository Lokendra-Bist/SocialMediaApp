import { createContext, useEffect, useState } from "react";
import { getMyConversations } from "../services/MessageService";
import { useAuth } from "../hooks/useAuth";

export const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user, token } = useAuth();

  const loadConversations = async () => {
    if (!user) return;
    try {
      const response = await getMyConversations();

      setConversations(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    loadConversations();
  }, [token]);

  const updateConversation = (message) => {
    setConversations((prev) => {
      const otherUser =
        message.senderId === user.id ? message.receiverId : message.senderId;

      const existing = prev.find((c) => c.id === otherUser);

      if (!existing) {
        return prev;
      }

      const updated = {
        ...existing,
        lastMessage: message.content,
        lastMessageTime: message.sentAt,
      };

      return [updated, ...prev.filter((c) => c.id !== otherUser)];
    });
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        setConversations,
        selectedConversation,
        setSelectedConversation,
        loading,
        loadConversations,
        updateConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
