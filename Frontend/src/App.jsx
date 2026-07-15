import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { useNotificationSocket } from "./hooks/useNotificationSocket";
import { MessageProvider } from "./context/MessageContext";
import { ConversationProvider } from "./context/ConversationContext";

function SocketInitializer() {
  useNotificationSocket();

  return null;
}

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <AuthProvider>
        <NotificationProvider>
          <ConversationProvider>
            <MessageProvider>
              <SocketInitializer />
              <AppRoutes />
            </MessageProvider>
          </ConversationProvider>
        </NotificationProvider>
      </AuthProvider>
    </>
  );
}

export default App;
