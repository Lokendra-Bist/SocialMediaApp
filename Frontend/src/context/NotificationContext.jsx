import { createContext, useCallback, useEffect, useState } from "react";
import {
  fetchNotifications,
  fetchUnreadCount,
} from "../services/NotificationService";
import { useAuth } from "../hooks/useAuth";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const { token, isAuthenticated } = useAuth();

  const loadNotifications = async () => {
    const list = await fetchNotifications();
    const unread = await fetchUnreadCount();

    setNotifications(list.data);
    setUnreadCount(unread);
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      loadNotifications();
    } else {
      setNotifications([]);
    }
  }, [isAuthenticated, token]);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [notification, ...prev]);

    setUnreadCount((prev) => prev + 1);
  }, []);

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
