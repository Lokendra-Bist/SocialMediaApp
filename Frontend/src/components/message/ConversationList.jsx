export const ConversationList = ({ users, selectedUser, selectUser }) => {
  return (
    <div className="w-full divide-y divide-gray-100">
      {users.map((user) => {
        const isActive = selectedUser?.id === user.id;

        return (
          <div
            key={user.id}
            onClick={() => selectUser(user)}
            className={`flex items-center gap-3 p-4 cursor-pointer transition-all

            ${
              isActive
                ? "bg-blue-100 border-r-4 border-blue-600"
                : "hover:bg-gray-50"
            }`}
          >
            <img
              src={
                user.profileImageUrl ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
              }
              className={`w-11 h-11 rounded-full object-cover ring-2

              ${isActive ? "ring-blue-500" : "ring-transparent"}`}
            />

            <div className="flex-1">
              <p
                className={`font-semibold

                ${isActive ? "text-blue-700" : "text-gray-900"}`}
              >
                {user.name}
              </p>

              <p className="text-sm text-gray-500 truncate">
                {user.lastMessage}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
