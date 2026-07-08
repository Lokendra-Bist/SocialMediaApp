import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/sidebar/LeftSidebar";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <LeftSidebar />

      <main className="flex-1 lg:ml-72 pt-20 lg:pt-6">
        <div className="max-w-2xl mx-auto px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
