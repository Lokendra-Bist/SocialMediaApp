import { useState } from "react";
import { addComments } from "../../services/CommentService";
import toast from "react-hot-toast";

export const CommentInput = ({ post }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await addComments(post.id, content);
    toast.success("Comment Success");
    setContent("");
  };

  return (
    <div className="border-t p-4 flex gap-3">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 rounded-xl border px-4 py-3 outline-none"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 rounded-xl cursor-pointer"
      >
        Post
      </button>
    </div>
  );
};
