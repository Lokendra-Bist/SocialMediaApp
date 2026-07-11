import { useNotification } from "../../hooks/useNotification";
import { formatPostDate } from "../../utils/formatPostDate";

export const Notification = () => {
  const { notifications } = useNotification();

  console.log("Notification.jsx", notifications);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-5">Notifications</h2>

      {!Array.isArray(notifications) || notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white rounded-xl shadow p-4 mb-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex gap-3 items-center">
              <img
                src={notification.senderProfileUrl}
                className="w-12 h-12 rounded-full object-cover"
                alt=""
              />

              <div>
                <p className="text-sm text-gray-900">
                  <span className="font-semibold mr-1">
                    {notification.senderName}
                  </span>
                  liked your post ❤️
                </p>

                <span className="text-xs text-blue-600 font-medium block mt-0.5">
                  {formatPostDate(notification.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
