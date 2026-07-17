import { FiUsers } from "react-icons/fi";

export const ProfileStats = ({ followers = 0, following = 0 }) => {
  const statsConfig = [
    {
      label: "Followers",
      value: followers,
      bgClass: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    },
    {
      label: "Following",
      value: following,
      bgClass: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
    },
  ];

  return (
    <div className="flex gap-8">
      {statsConfig.map((stat, idx) => (
        <div
          key={idx}
          className="group cursor-pointer flex items-center gap-3 p-3 px-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
        >
          <div className={`p-2.5 rounded-lg transition-colors ${stat.bgClass}`}>
            <FiUsers size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {stat.value.toLocaleString()}
            </h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
