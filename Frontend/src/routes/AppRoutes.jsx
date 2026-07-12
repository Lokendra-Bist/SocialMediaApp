import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { AuthLayout } from "../layouts/AuthLayout";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { PublicRoute } from "../routes/PublicRoute";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { Notification } from "../pages/notification/Notification";
import { MainLayout } from "../layouts/MainLayout";
import { Messages } from "../pages/message/Messages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/messages" element={<Messages />} />
      </Route>

      <Route
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};
