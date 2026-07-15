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

  getChatHistory(userId) {
    console.log("UserId for chat history in messageapi: ", userId);

    return api.get(`/api/message/${userId}`);
  },
};
