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
    profile,
  } = useCreatePost();

  const isPostable = content.trim() || imagePreview;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm transition-all">
      <div className="flex items-center gap-3">
        <img
          src={profile?.imageUrl || "/default-avatar.png"}
          alt="User avatar"
          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
        />

        <div className="relative flex-1">
          <textarea
            value={content}
            onChange={handleInputChange}
            placeholder={`What's on your mind${profile?.firstName ? `, ${profile.firstName}` : ""}?`}
            rows={content ? 2 : 1}
            className="w-full bg-slate-100 hover:bg-slate-100/80 focus:bg-transparent border border-transparent focus:border-slate-300 rounded-2xl px-4 py-2 text-sm text-slate-800 placeholder-slate-500 outline-none resize-none transition-all leading-snug"
          />
        </div>
      </div>

      {(errors?.content || errors?.image) && (
        <div className="mt-2 text-xs text-red-500 font-medium px-1">
          {errors.content || errors.image}
        </div>
      )}

      {imagePreview && (
        <div className="relative mt-2.5 inline-block">
          <div className="h-28 w-28 overflow-hidden rounded-lg border border-slate-200 bg-slate-900/5 shadow-xs">
            <img
              src={imagePreview}
              alt="Upload preview"
              className="h-full w-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={removeImage}
            className="absolute -right-2 -top-2 rounded-full bg-slate-800 p-1 text-white shadow-md transition-transform hover:scale-110"
            title="Remove photo"
          >
            <FaTimes size={10} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1">
          <label className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors text-xs font-semibold">
            <FaImage size={16} className="text-emerald-500" />
            <span>Photo/video</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>

        <button
          disabled={loading || !isPostable}
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium text-xs px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <span>Post</span>
              <IoSend size={12} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
