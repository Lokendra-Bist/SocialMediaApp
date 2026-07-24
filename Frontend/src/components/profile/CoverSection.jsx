import { useState, useRef, useEffect } from "react";
import { FiCamera, FiUpload, FiTrash2 } from "react-icons/fi";

export const CoverSection = ({ imageUrl, onUpload, onDelete }) => {
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
    <div className="relative h-64 w-full bg-gray-100 group overflow-visible">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <img
        src={imageUrl}
        alt="Cover Banner"
        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

      <div className="absolute bottom-4 right-4 z-10" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 text-white rounded-xl text-xs font-semibold backdrop-blur-sm transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <FiCamera size={14} />
          Change Cover
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-100">
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
    </div>
  );
};
