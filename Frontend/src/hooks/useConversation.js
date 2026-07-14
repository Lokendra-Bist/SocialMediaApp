import { useEffect, useState } from "react";
import { getMyConversations } from "../services/MessageService";

export const useConversation = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadConversations = async () => {
    try {
      const response = await getMyConversations();
      console.log("Loaded Conversations: ", response.data);

      setConversations(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  return {
    conversations,
    setConversations,
    loadConversations,
    loading,
  };
};
