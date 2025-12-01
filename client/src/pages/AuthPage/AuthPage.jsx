import { Button } from "../../components/ui/Button";
import { useAuthPage } from "./useAuthPage";

// AuthPage Component
// -------------------
// This component handles Login & Signup UI.
// It switches between tabs, shows form fields,
// displays validation messages, and triggers auth actions.

export default function AuthPage() {

   // Custom hook containing all logic for form handling, validation, and API integration
 
 const {
    activeTab,   // Current selected tab: "login" or "signup"
    formData,    // Form input values
    errors,      // Validation error messages
    message,    // Global success/error/info messages
    isSigningUp,  // Loading state for signup
    isLoggingIn,   // Loading state for login
    handleChange,  // Updates form field values
    handleSubmit,   // Handles form submission
    switchTab,      // Switches between login and signup tabs
  } = useAuthPage();   

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 mt-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome</h1>
            <p className="text-green-50 mt-1">Sign in to continue</p>
          </div>

          <div className="flex border-b border-green-100">
            <button
              onClick={() => switchTab("login")}
              className={`flex-1 py-4 text-center font-semibold transition-all ${
                activeTab === "login"
                  ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                  : "text-gray-500 hover:text-green-600 hover:bg-green-50 cursor-pointer "
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchTab("signup")}
              className={`flex-1 py-4 text-center font-semibold transition-all ${
                activeTab === "signup"
                  ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                  : "text-gray-500 hover:text-green-600 hover:bg-green-50 cursor-pointer"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8">
            {message.text && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : message.type === "error"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="space-y-4">
              {activeTab === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.firstName ? "border-red-500" : "border-green-200"
                    } focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              )}
              {activeTab === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.lastName ? "border-red-500" : "border-green-200"
                    } focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-green-200"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-green-200"
                  } focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {activeTab === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-green-200"
                    } focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={isSigningUp || isLoggingIn}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all cursor-pointer"
              >
                {isSigningUp || isLoggingIn
                  ? "Processing..."
                  : activeTab === "login"
                  ? "Login"
                  : "Sign Up"}
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-2">
          {activeTab === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={() =>
              switchTab(activeTab === "login" ? "signup" : "login")
            }
            className="text-green-600 font-semibold hover:text-green-700 cursor-pointer"
          >
            {activeTab === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
