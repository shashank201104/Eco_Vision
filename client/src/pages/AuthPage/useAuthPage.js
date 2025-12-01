import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

// ---------------------------------------------------------------
// useAuthPage Hook
// ---------------------------------------------------------------
// This custom hook contains all authentication logic used by AuthPage.
// It handles:
// - Form state
// - Field validation
// - Login & Signup API calls (through Zustand store)
// - Error messages & loading states
// - Tab switching logic
// ---------------------------------------------------------------

export const useAuthPage = () => {
  // Tracks active form tab: "login" or "signup"
  const [activeTab, setActiveTab] = useState("login");

   // Form field values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  // Stores validation errors 
  const [errors, setErrors] = useState({});

  // Stores global messages 
  const [message, setMessage] = useState({ type: "", text: "" });

  // Extracting auth methods & states from Zustand store
  // These functions trigger actual API calls
  const { signup, login, authUser, isSigningUp, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  // Redirect user to homepage if already logged in
  useEffect(() => {
    if (authUser) navigate("/");
  }, [authUser]);

  // Basic email validation using regex
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  // Validates all form inputs based on active tab
  const validateForm = () => {
    const newErrors = {};

     // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Additional validations for signup tab
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

  // Handles input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  // Handles form submission for login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

   // LOGIN API CALL via Zustand store
    if (activeTab === "login") {
      await login({
        email: formData.email,
        password: formData.password,
      });
      // SIGNUP API CALL via Zustand store
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
  
  // Switches between login and signup tabs
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
