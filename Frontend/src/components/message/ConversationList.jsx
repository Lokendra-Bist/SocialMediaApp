export const ConversationList = ({ users, selectUser }) => {
  return (
    <div className="w-full divide-y divide-gray-100">
      {users?.length > 0 ? (
        users.map((user) => (
          <div
            key={user.userId}
            onClick={() => selectUser(user)}
            className="flex items-center gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer group"
          >
            {/* Profile Image Wrapper */}
            <div className="relative flex-shrink-0">
              <img
                src={
                  user.profileImageUrl ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
                }
                alt={`${user.name}'s profile`}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-100 transition-all"
              />
            </div>

            {/* Conversation Content Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {user.name}
                </p>
                {user.lastMessageTime && (
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {new Date(user.lastMessageTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>

              {/* Last Message Preview */}
              {user.lastMessage && (
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {user.lastMessage}
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <p className="text-sm text-gray-400 font-medium">
            No conversations found
          </p>
        </div>
      )}
    </div>
  );
};
