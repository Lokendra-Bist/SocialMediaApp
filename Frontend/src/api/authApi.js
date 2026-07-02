import { api } from "../api/axios";

export const sendOTP = async (email, type) => {
  return await api.post("/api/auth/sent-otp", { email, type });
};

export const verifyOtpAndRegister = async (data) => {
  return await api.post("/api/auth/verifyOtpAndRegister", data);
};

export const login = async (data) => {
  return await api.post("/api/auth/login", data);
};

export const verifyResetPasswordOtp = async (data) => {
  return await api.post("/api/auth/verify-resetPassword-otp", data);
};

export const resetPassword = async (data) => {
  return await api.post("/api/auth/reset-password", data);
};
