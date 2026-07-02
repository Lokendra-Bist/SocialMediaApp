import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export const CreatePostCard = () => {
  const [content, setContent] = useState("");

  return (
    <div className="sticky top-0 z-20 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
      <div className="flex gap-4">
        <img
          src=""
          alt="User avatar"
          className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows={3}
          className="w-full bg-transparent outline-none resize-none text-slate-800 placeholder-slate-400 text-base py-1 leading-relaxed"
        />
      </div>
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
        <label className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
          <FaImage size={18} className="text-blue-500" />
          <span>Photo / Video</span>
          <input type="file" accept="image/*" hidden />
        </label>

        <button
          disabled={!content.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 active:scale-98 shadow-sm shadow-blue-100 disabled:shadow-none"
        >
          <span>Post</span>
          <IoSend size={15} />
        </button>
      </div>
    </div>
  );
};
