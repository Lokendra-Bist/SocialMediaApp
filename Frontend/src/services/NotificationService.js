import { notificationApi } from "../api/notificationApi";

export const fetchNotifications = async () => {
  const response = await notificationApi.getNotifications();
  console.log(response.data);

  return response.data;
};

export const fetchUnreadCount = async () => {
  const response = await notificationApi.getUnreadCount();
  return response.data.data;
};

export const markAllRead = async () => {
  await notificationApi.markAllRead();
};
