import { api } from "./axios";

export const notificationApi = {
  getNotifications() {
    return api.get("/api/notifications");
  },

  getUnreadCount() {
    return api.get("/api/notifications/unread-count");
  },

  markAllRead() {
    return api.put("/api/notifications/read-all");
  },
};
