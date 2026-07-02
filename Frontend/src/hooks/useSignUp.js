import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendOTP, verifyOTPAndRegisterUser } from "../services/AuthService";
import { validateForm } from "../validation/SignUpValidation";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSetOtp = (value) => {
    setFormData((prev) => ({ ...prev, otp: value }));
  };

  const sendOtpRequest = async () => {
    try {
      setSendingOtp(true);
      await sendOTP(formData.email, "REGISTRATION");
      setSendingOtp(false);
      toast.success("Verification code sent.");
    } catch (err) {
      console.error(err);
      setOtpModalOpen(false);
      setSendingOtp(false);
      toast.error(err.response?.data?.message || "Unable to send OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm({ formData, setErrors })) return;
    setOtpModalOpen(true);
    await sendOtpRequest();
  };

  const handleVerifyOtpAndRegister = async () => {
    try {
      await verifyOTPAndRegisterUser(formData);
      toast.success("Account created successfully!");
      setOtpModalOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        password: "",
        otp: "",
      });
      navigate("/signin");
    } catch (err) {
      toast.error("Invalid OTP. Please try again!");
      Error("Error verifying OTP:", err);
    }
  };

  const handleCloseModal = () => {
    setOtpModalOpen(false);
    setFormData((prev) => ({ ...prev, otp: "" }));
  };

  return {
    formData,
    errors,
    showPassword,
    otpModalOpen,
    sendingOtp,
    setShowPassword,
    handleChange,
    handleSubmit,
    handleSetOtp,
    handleVerifyOtpAndRegister,
    sendOtpRequest,
    handleCloseModal,
  };
};
