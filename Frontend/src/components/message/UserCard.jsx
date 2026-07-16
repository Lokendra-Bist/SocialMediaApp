export const UserCard = ({ user, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(user)}
      className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
    >
      <img
        src={user.profileImageUrl}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div>
        <h4 className="font-semibold">{user.name}</h4>
      </div>
    </div>
  );
};
