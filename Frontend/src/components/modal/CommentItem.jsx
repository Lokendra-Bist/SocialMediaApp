export const CommentItem = ({ comment }) => {
  return (
    <div className="flex gap-3">
      <img
        src={comment.senderProfileImage}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-semibold">{comment.senderName}</h4>

          <span className="text-xs text-gray-500">{comment.createdAt}</span>
        </div>

        <p className="mt-1 text-gray-700">{comment.content}</p>
      </div>
    </div>
  );
};
