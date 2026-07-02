import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetUsersPassword } from "../services/AuthService";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

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

  const validate = () => {
    const { password, confirmPassword } = formData;
    let tempErrors = {};

    if (!password.trim()) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      tempErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      tempErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      tempErrors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      tempErrors.password =
        "Password must contain at least one special character.";
    }

    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      await resetUsersPassword({
        email: email,
        password: formData.password,
      });
      setFormData({
        password: "",
        confirmPassword: "",
      });

      toast.success("Password reset successfully!");
      navigate("/signin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
  };
};
