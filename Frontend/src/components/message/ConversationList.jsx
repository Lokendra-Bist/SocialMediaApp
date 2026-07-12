export const ConversationList = ({ users, selectUser }) => {
  return (
    <div className="w-80 border-r">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => selectUser(user)}
          className="p-4 hover:bg-gray-100 cursor-pointer"
        >
          {user.firstName} {user.lastName}
        </div>
      ))}
    </div>
  );
};
