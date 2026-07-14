import { messageApi } from "../api/messageApi";

export const sendMessages = async (receiverId, text) => {
  try {
    const response = await messageApi.sendMessage(receiverId, text);
    return response.data;
  } catch (error) {
    console.error("Error sending messages:", error);
    throw error;
  }
};

export const getMyConversations = async () => {
  try {
    const response = await messageApi.getConversations();
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};
