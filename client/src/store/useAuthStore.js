import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
export const UseAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("Auth Check Response:", res.data);
      set({ authUser: res.data });
    } catch (error) {
      console.error(
        "Error in useAuthStore:",
        error.response?.data || error.message
      );
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  SignUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/Signup", data);
      set({ authUser: res.data });
      toast.success("Signed up successfully");
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  Login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  LogOut: async () => {
    try {
      await axiosInstance.post("/auth/Logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      alert(error.response.data.message);
    }
  },

}));
