import { useState, useRef, useEffect } from "react";
import { FiCamera, FiUpload, FiTrash2 } from "react-icons/fi";

export const AvatarSection = ({ imageUrl, onUpload, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    setShowMenu(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-md overflow-hidden bg-white group/avatar">
        <img
          src={imageUrl}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 text-white cursor-pointer"
        >
          <FiCamera size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Update
          </span>
        </button>
      </div>

      {showMenu && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-100">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left font-medium"
          >
            <FiUpload size={14} className="text-gray-400" />
            Upload Photo
          </button>
          {imageUrl && (
            <button
              onClick={() => {
                onDelete();
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-medium border-t border-gray-50"
            >
              <FiTrash2 size={14} />
              Remove Photo
            </button>
          )}
        </div>
      )}
    </div>
  );
};
