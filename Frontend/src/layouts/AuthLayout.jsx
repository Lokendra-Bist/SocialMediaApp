import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-indigo-700 via-violet-700 to-slate-900 text-white p-12">
        <div>
          <h1 className="text-4xl font-bold">WeLink</h1>

          <p className="mt-3 text-lg text-gray-200">Connect with the world.</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Share your ideas.
            <br />
            Meet amazing people.
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Join millions of people discovering communities, building
            friendships, and sharing moments.
          </p>
        </div>

        <p className="text-gray-400">© 2026 WeLink</p>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
