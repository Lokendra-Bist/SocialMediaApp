import { useNotification } from "../../hooks/useNotification";
import { formatPostDate } from "../../utils/formatPostDate";

const renderNotificationText = (type) => {
  switch (type) {
    case "LIKE":
      return <>liked your post</>;
    case "COMMENT":
      return <>commented on your post</>;
    case "FOLLOW":
      return <>started following you</>;
    default:
      return "interacted with your content";
  }
};

export const Notification = () => {
  const { notifications } = useNotification();

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4 sm:px-0">
      <h2 className="text-2xl font-bold mb-5 text-slate-800">Notifications</h2>

      {!Array.isArray(notifications) || notifications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-100 shadow-xs">
          <p className="text-slate-500 font-medium">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl border border-slate-100 shadow-xs p-4 hover:bg-slate-50 transition-colors ${
                !notification.isRead ? "bg-blue-50/30 border-blue-100" : ""
              }`}
            >
              <div className="flex gap-3.5 items-center">
                <img
                  src={notification.senderProfileUrl || "/default-avatar.png"}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                  alt={notification.senderName || "User avatar"}
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 leading-snug">
                    <span className="font-semibold text-slate-900 mr-1.5">
                      {notification.senderName}
                    </span>
                    {renderNotificationText(notification.type)}
                  </p>

                  <span className="text-xs text-slate-400 font-medium block mt-1">
                    {formatPostDate(notification.createdAt)}
                  </span>
                </div>

                {!notification.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
