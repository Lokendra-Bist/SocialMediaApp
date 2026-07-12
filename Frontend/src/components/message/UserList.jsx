import { UserCard } from "./UserCard";

export const UserList = ({ users, onSelect }) => {
  return (
    <div className="mt-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onSelect={onSelect} />
      ))}
    </div>
  );
};
