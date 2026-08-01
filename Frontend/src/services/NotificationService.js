import { notificationApi } from "../api/notificationApi";

export const fetchNotifications = async () => {
  const response = await notificationApi.getNotifications();
  console.log("Fetched notifications: ", response.data);
  return response.data;
};

export const fetchUnreadCount = async () => {
  const response = await notificationApi.getUnreadCount();
  console.log("Fetched unread notifications count: ", response.data);
  return response.data.data;
};

export const markAllRead = async () => {
  await notificationApi.markAllRead();
};
