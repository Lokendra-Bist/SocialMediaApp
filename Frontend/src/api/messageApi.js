import { api } from "./axios";

export const messageApi = {
  sendMessage(receiverId, text) {
    return api.post("/api/message/send", {
      receiverId: receiverId,
      content: text,
    });
  },

  getConversations() {
    return api.get("/api/conversation/conversations");
  },
};
