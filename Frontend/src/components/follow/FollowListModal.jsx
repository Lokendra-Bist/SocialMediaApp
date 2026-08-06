import { FiX } from "react-icons/fi";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export const FollowListModal = ({
  title,
  users,
  hasMore,
  onLoadMore,
  onClose,
}) => {
  const observerRef = useInfiniteScroll({
    loading: false,
    hasMore,
    onLoadMore,
  });

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-[450px] h-[650px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.profileImageUrl}
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <div className="font-semibold">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              </div>

              <button
                className={`px-4 py-1 rounded-full ${
                  user.following ? "bg-gray-200" : "bg-blue-600 text-white"
                }`}
              >
                {user.following ? "Following" : "Follow Back"}
              </button>
            </div>
          ))}

          <div ref={observerRef} className="h-10" />
        </div>
      </div>
    </div>
  );
};
