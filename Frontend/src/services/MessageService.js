import { messageApi } from "../api/messageApi";

export const sendMessages = async (receiverId, text) => {
  try {
    const response = await messageApi.sendMessage(receiverId, text);
    console.log("Message sent successfully: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending messages:", error);
    throw error;
  }
};

export const getMyConversations = async () => {
  try {
    const response = await messageApi.getConversations();
    console.log("Fetched conversations: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

export const getChatHistory = async (userId) => {
  try {
    const response = await messageApi.getChatHistory(userId);
    console.log("Fetched chat history: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
};
