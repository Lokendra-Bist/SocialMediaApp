import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export const useSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    isLoading,
    handleChange,
    handleSubmit,
    togglePassword,
  };
};
