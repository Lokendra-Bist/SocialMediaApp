import { createContext, useEffect, useState } from "react";
import {
  fetchNotifications,
  fetchUnreadCount,
} from "../services/NotificationService";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const list = await fetchNotifications();

    const unread = await fetchUnreadCount();

    setNotifications(list.data);

    setUnreadCount(unread);
  };

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);

    setUnreadCount((prev) => prev + 1);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        setUnreadCount,
        loadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
