import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export const useSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const tempErrors = {};

    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await login(formData);
      toast.success("LogIn Successful!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid Credentials. Please Try Again!");
      console.error("Error while login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    togglePassword,
  };
};
