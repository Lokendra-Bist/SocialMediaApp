export const MessageBubble = ({ message, mine }) => {
  return (
    <div className={`flex mb-3 ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-sm ${
          mine ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};
