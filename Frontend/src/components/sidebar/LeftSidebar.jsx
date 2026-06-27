import {
  FaHome,
  FaCompass,
  FaBell,
  FaEnvelope,
  FaHeart,
  FaUser,
  FaCog,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Home",
    icon: <FaHome size={20} />,
  },
  {
    name: "Explore",
    icon: <FaCompass size={20} />,
  },
  {
    name: "Notifications",
    icon: <FaBell size={20} />,
  },
  {
    name: "Messages",
    icon: <FaEnvelope size={20} />,
  },
  {
    name: "Favorites",
    icon: <FaHeart size={20} />,
  },
  {
    name: "Profile",
    icon: <FaUser size={20} />,
  },
  {
    name: "Settings",
    icon: <FaCog size={20} />,
  },
];

export default function LeftSidebar() {
  return (
    <aside className="w-72 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col p-4">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">SocialHub</h1>

        <p className="text-sm text-zinc-400 mt-1">Connect with everyone</p>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                className="
                  w-full
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-xl
                  text-zinc-300
                  hover:bg-zinc-800
                  hover:text-white
                  transition
                "
              >
                {item.icon}

                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-t border-zinc-800 pt-4">
        <button
          className="
            w-full
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-zinc-800
            transition
          "
        >
          <img
            src=""
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div className="text-left">
            <h4 className="text-white font-medium">Loken</h4>

            <p className="text-xs text-zinc-400">@loken</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
