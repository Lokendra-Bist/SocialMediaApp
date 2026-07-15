import { useContext } from "react";
import { ConversationContext } from "../context/ConversationContext";

export const useConversation = () => {
  return useContext(ConversationContext);
};
