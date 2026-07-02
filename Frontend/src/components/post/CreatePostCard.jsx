import { FaImage, FaTimes } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useCreatePost } from "../../hooks/useCreatePost";

export const CreatePostCard = () => {
  const {
    content,
    handleInputChange,
    handleImageChange,
    imagePreview,
    removeImage,
    handleSubmit,
    errors,
    loading,
  } = useCreatePost();

  return (
    <div className="sticky top-0 z-20 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
      <div className="flex gap-4">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          alt="User avatar"
          className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
        />

        <textarea
          value={content}
          onChange={handleInputChange}
          placeholder="What's on your mind?"
          rows={3}
          className="w-full bg-transparent outline-none resize-none text-slate-800 placeholder-slate-400 text-base py-1 leading-relaxed"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-2">{errors.content}</p>
        )}
      </div>

      {imagePreview && (
        <div className="relative mt-4 ml-15 rounded-xl overflow-hidden border border-slate-100 max-h-60 bg-slate-50">
          <img
            src={imagePreview}
            alt="Upload preview"
            className="w-full h-full object-cover max-h-60"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
          >
            <FaTimes size={14} />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
        <label className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
          <FaImage size={18} className="text-blue-500" />
          <span>Photo / Video</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">{errors.image}</p>
          )}
        </label>

        <button
          disabled={!content.trim() || !imagePreview}
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 active:scale-98 shadow-sm shadow-blue-100 disabled:shadow-none"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Posting...
            </>
          ) : (
            <>
              <span>Post</span>
              <IoSend size={15} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
