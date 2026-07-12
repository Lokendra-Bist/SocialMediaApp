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
