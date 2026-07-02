import * as authApi from "../api/authApi";

export const sendOTP = async (email, type) => {
  try {
    const response = await authApi.sendOTP(email, type);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const verifyOTPAndRegisterUser = async (data) => {
  try {
    const response = await authApi.verifyOtpAndRegister(data);
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await authApi.login(data);
    return response.data;
  } catch (error) {
    console.error("Error while loggedIn:", error);
    throw error;
  }
};

export const verifyOtpForResetPassword = async (data) => {
  try {
    const response = await authApi.verifyResetPasswordOtp(data);
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const resetUsersPassword = async (data) => {
  try {
    const response = await authApi.resetPassword(data);
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
