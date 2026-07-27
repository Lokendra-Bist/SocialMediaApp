import { CommentItem } from "./CommentItem";

export const CommentList = ({ comments }) => {
  return (
    <div className="space-y-4 p-5">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
