import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { useNotificationSocket } from "./hooks/useNotificationSocket";
import { MessageProvider } from "./context/MessageContext";
import { ConversationProvider } from "./context/ConversationContext";
import { PostProvider } from "./context/PostContext";

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
              <PostProvider>
                <SocketInitializer />
                <AppRoutes />
              </PostProvider>
            </MessageProvider>
          </ConversationProvider>
        </NotificationProvider>
      </AuthProvider>
    </>
  );
}

export default App;
