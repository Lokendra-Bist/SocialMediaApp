import { useState } from "react";
import {
  FaHome,
  FaCompass,
  FaBell,
  FaEnvelope,
  FaHeart,
  FaUser,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { useNotification } from "../../hooks/useNotification";

const menuItems = [
  { name: "Home", icon: <FaHome size={20} />, path: "/" },
  { name: "Explore", icon: <FaCompass size={20} /> },
  { name: "Notifications", icon: <FaBell size={20} />, path: "/notifications" },
  { name: "Messages", icon: <FaEnvelope size={20} />, path: "/messages" },
  { name: "Favorites", icon: <FaHeart size={20} /> },
  { name: "Profile", icon: <FaUser size={20} /> },
  { name: "Settings", icon: <FaCog size={20} /> },
  { name: "LogOut", icon: <FaSignOutAlt size={20} />, action: "logout" },
];

export default function LeftSidebar() {
  const [open, setOpen] = useState(false);

  const { logout } = useAuth();

  const navigate = useNavigate();

  const { unreadCount } = useNotification();

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 z-50">
        <button onClick={() => setOpen(true)} className="text-white text-2xl">
          <FaBars />
        </button>

        <h1 className="text-xl font-bold text-white">SocialHub</h1>

        <img
          src=""
          alt="profile"
          className="w-10 h-10 rounded-full bg-zinc-700"
        />
      </header>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
              fixed
              top-0
              left-0
              z-50
              w-72
              h-screen
              bg-zinc-950
              border-r
              border-zinc-800
              flex
              flex-col
              p-5
              transform
              transition-transform
              duration-300
              ${open ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x-0
      `}
      >
        <div className="flex justify-end lg:hidden mb-5">
          <button
            onClick={() => setOpen(false)}
            className="text-white text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">SocialHub</h1>

          <p className="text-sm text-zinc-400 mt-1">Connect with everyone</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    if (item.action === "logout") {
                      logout();
                      navigate("/login");
                    } else {
                      navigate(item.path || "/");
                    }
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                >
                  {item.name === "Notifications" ? (
                    <div className="relative">
                      <FaBell size={20} />

                      {unreadCount > 0 && (
                        <span
                          className="
            absolute
            -top-2
            -right-2
            bg-red-500
            text-white
            rounded-full
            text-[10px]
            w-5
            h-5
            flex
            items-center
            justify-center"
                        >
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  ) : (
                    item.icon
                  )}
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-zinc-800 pt-4">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition">
            <img
              src=""
              alt="profile"
              className="w-12 h-12 rounded-full bg-zinc-700"
            />

            <div className="text-left">
              <h4 className="text-white font-medium">Loken</h4>

              <p className="text-xs text-zinc-400">@loken</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
