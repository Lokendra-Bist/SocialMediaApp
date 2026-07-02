import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};
