import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export const useAuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  const { signup, login, authUser, isSigningUp, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) navigate("/");
  }, [authUser]);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (activeTab === "signup") {
      if (!formData.firstName) newErrors.firstName = "First Name is required";
      if (!formData.lastName) newErrors.lastName = "Last Name is required";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    if (activeTab === "login") {
      await login({
        email: formData.email,
        password: formData.password,
      });
    } else {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
    }

    if (authUser) {
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
      });
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    });
    setErrors({});
    setMessage({ type: "", text: "" });
  };

  return {
    activeTab,
    setActiveTab,
    formData,
    errors,
    message,
    isSigningUp,
    isLoggingIn,
    handleChange,
    handleSubmit,
    switchTab,
  };
};
