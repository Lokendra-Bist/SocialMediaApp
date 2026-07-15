import { useState } from "react";
import { ConversationList } from "../../components/message/ConversationList";
import { ChatWindow } from "../../components/message/ChatWindow";
import { SearchBar } from "../../components/message/SearchBar";
import { useUsers } from "../../hooks/useUsers";
import { UserList } from "../../components/message/UserList";
import { FiPlus, FiX } from "react-icons/fi";
import { useConversation } from "../../hooks/useConversation";

export const Messages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, search } = useUsers();

  const {
    conversations,
    setConversations,
    selectedConversation,
    setSelectedConversation,
  } = useConversation();

  const handleSelectUser = (user) => {
    setSelectedConversation(user);

    setConversations((prev) => {
      const exists = prev.some((c) => c.id === user.userId);

      if (exists) {
        return prev;
      }

      return [user, ...prev];
    });

    setIsModalOpen(false);
  };

  return (
    <div className="relative flex h-[90vh] bg-white rounded-xl shadow overflow-hidden">
      <div className="w-80 border-r border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors flex items-center justify-center"
            title="New Conversation"
          >
            <FiPlus size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Recent Chats
          </div>
          <ConversationList
            users={conversations}
            selectedUser={selectedConversation}
            selectUser={setSelectedConversation}
          />
        </div>
      </div>

      <div className="flex-1 bg-gray-50">
        {selectedConversation ? (
          <ChatWindow
            key={selectedConversation.id}
            receiver={selectedConversation}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a conversation or start a new one
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                New Conversation
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-4 border-b border-gray-100">
              <SearchBar onSearch={search} />
            </div>

            <div className="flex-1 overflow-y-auto p-2 min-h-[250px]">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider sticky top-0 bg-white z-10">
                Suggested Contacts
              </div>

              {users && users.length > 0 ? (
                <UserList users={users} onSelect={handleSelectUser} />
              ) : (
                <div className="text-center py-8 text-sm text-gray-400">
                  No users found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
