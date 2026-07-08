import { useNotification } from "../../hooks/useNotification";

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
            className="bg-white rounded-xl shadow p-4 mb-4"
          >
            <div className="flex gap-3">
              <img
                src={notification.senderProfileUrl}
                className="w-12 h-12 rounded-full"
                alt=""
              />

              <div>
                <h4 className="font-semibold">{notification.senderName}</h4>

                <p>liked your post ❤️</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
