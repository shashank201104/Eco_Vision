import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

// Utility function: safely extract error messages
const getErrorMessage = (err) => {
  return err?.response?.data?.message || "Something went wrong";
};

// ---------------------------------------------
// Auth Store (JWT stored in httpOnly cookies)
// ---------------------------------------------
export const useAuthStore = create(
  persist(
    (set) => ({
      // ------------------ State ------------------
      authUser: null,            // Stores minimal user info
      isCheckingAuth: true,
      isLoggingIn: false,
      isSigningUp: false,

      // ------------------ Actions ------------------
      
      // AUTO LOGIN CHECK (runs on page load)
      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check", {
            withCredentials: true, // required for httpOnly cookie
          });

          set({ authUser: res.data });
        } catch (err) {
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      // SIGN UP
      signup: async (data) => {
        set({ isSigningUp: true });

        try {
          const res = await axiosInstance.post("/auth/Signup", data, {
            withCredentials: true,
          });

          set({ authUser: res.data });
          toast.success("Account created successfully!");
        } catch (err) {
          toast.error(getErrorMessage(err));
        } finally {
          set({ isSigningUp: false });
        }
      },

      // LOGIN
      login: async (data) => {
        set({ isLoggingIn: true });

        try {
          const res = await axiosInstance.post("/auth/login", data, {
            withCredentials: true,
          });

          set({ authUser: res.data });
          toast.success("Welcome back!");
        } catch (err) {
          toast.error(getErrorMessage(err));
        } finally {
          set({ isLoggingIn: false });
        }
      },

      // LOGOUT
      logout: async () => {
        try {
          await axiosInstance.post("/auth/Logout", {}, { withCredentials: true });

          set({ authUser: null });
          toast.success("Logged out successfully");
        } catch (err) {
          toast.error(getErrorMessage(err));
        }
      },
    }),

    {
      name: "auth-store", // LocalStorage key
      partialize: (state) => ({ authUser: state.authUser }), // only save user data
    }
  )
);
