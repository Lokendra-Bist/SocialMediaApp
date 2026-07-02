import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendOTP, verifyOtpForResetPassword } from "../services/AuthService";

export const useForgotPassword = () => {
  const [errors, setErrors] = useState({});
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSetOtp = (value) => {
    setFormData((prev) => ({
      ...prev,
      otp: value,
    }));
  };

  const handleVerify = async () => {
    try {
      await verifyOtpForResetPassword(formData);
      setOtpModalOpen(false);
      setFormData((prev) => ({ ...prev, otp: "" }));
      navigate("/reset-password", { state: { email: formData.email } });
    } catch (err) {
      toast.error("Invalid OTP code. Please try again.");
      console.error(err);
    }
  };

  const sendOtpRequest = async () => {
    try {
      setSendingOtp(true);
      await sendOTP(formData.email, "FORGOT_PASSWORD");
      setOtpModalOpen(true);
      toast.success("Verification code sent.");
    } catch (err) {
      setOtpModalOpen(false);
      toast.error("Email is not found!");
      console.error(err);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    sendOtpRequest(formData.email);
  };

  const handleCloseModal = () => {
    setOtpModalOpen(false);
    setFormData((prev) => ({ ...prev, otp: "" }));
  };

  return {
    formData,
    errors,
    otpModalOpen,
    sendingOtp,
    handleChange,
    handleSetOtp,
    handleSubmit,
    handleVerify,
    sendOtpRequest,
    handleCloseModal,
  };
};
