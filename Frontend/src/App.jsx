import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { MessageProvider } from "./context/MessageContext";
import { ConversationProvider } from "./context/ConversationContext";
import { PostProvider } from "./context/PostContext";
import { SocketProvider } from "./context/SocketContext";
import { useMessageSocket } from "./hooks/useMessageSocket";
import { usePostSocket } from "./hooks/usePostSocket";
import { useNotificationSocket } from "./hooks/useNotificationSocket";
import { CommentProvider } from "./context/CommentContext";

function SocketInitializer() {
  useNotificationSocket();
  useMessageSocket();
  usePostSocket();

  return null;
}

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <AuthProvider>
        <SocketProvider>
          <NotificationProvider>
            <ConversationProvider>
              <MessageProvider>
                <PostProvider>
                  <CommentProvider>
                    <SocketInitializer />
                    <AppRoutes />
                  </CommentProvider>
                </PostProvider>
              </MessageProvider>
            </ConversationProvider>
          </NotificationProvider>
        </SocketProvider>
      </AuthProvider>
    </>
  );
}

export default App;
