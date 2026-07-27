import { createContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();

  const [client, setClient] = useState(null);

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:2058/WeLink/ws"),

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Socket Connected");
        setConnected(true);
      },

      onDisconnect: () => {
        console.log("Socket Disconnected");
        setConnected(false);
      },
    });

    setClient(stompClient);

    stompClient.activate();

    return () => stompClient.deactivate();
  }, [token, isAuthenticated]);

  return (
    <SocketContext.Provider
      value={{
        client,
        connected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
