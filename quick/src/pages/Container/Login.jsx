import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';

function Login() {
  const { setShowLogin, setUser, fetchUser, axios } = useAppContext();
  const navigate = useNavigate();
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    userId: "",
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // ✅ Simple payload structure
      let payload, endpoint;
      
      if (state === "register") {
        payload = { 
          userId: formData.userId.trim(),
          fullname: formData.fullname.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        };
        endpoint = '/api/auth/register';
      } else {
        payload = { 
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        };
        endpoint = '/api/auth/login';
      }

      console.log("🔄 Sending to:", endpoint, payload);

      const response = await axios.post(endpoint, payload);
      const data = response.data;

      console.log("✅ Auth success:", data);

      if (data.success) {
        // Store token and user data
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }
        
        setShowLogin(false);
        navigate('/userhome');
        resetForm();
        
        // Refresh user data
        setTimeout(() => {
          fetchUser();
        }, 1000);
      }
    } catch (error) {
      console.error("🚨 Auth error:", error);
      
      // Better error handling
      let errorMessage = "Something went wrong";
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "No response from server. Check your connection.";
      } else {
        // Something else happened
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      fullname: "",
      email: "",
      password: "",
    });
  };

  const handleClose = () => {
    setShowLogin(false);
    resetForm();
    setError("");
  };

  const switchState = () => {
    setState(state === "login" ? "register" : "login");
    setError("");
    resetForm();
  };

  // Forgot Password handler
  const handleForgotPassword = () => {
    setShowLogin(false);
    navigate('/forgot-password');
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <form
        onSubmit={onSubmitHandle}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#101427] backdrop-blur-md shadow-2xl border border-[#1f2236] p-8 py-10 rounded-2xl w-[90%] max-w-md flex flex-col gap-5"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors text-xl font-bold"
          disabled={submitting}
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#bfc6ff] mb-1">
            QuickIndexing
          </h1>
          <p className="text-gray-400 mb-2 tracking-widest text-xs">
            {state === "login" ? "SECURE ACCESS PORTAL" : "JOIN THE SYSTEM"}
          </p>
          <h2 className="text-2xl font-bold text-center text-white mt-2">
            {state === "login" ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full p-3 bg-red-900/20 border border-red-700 rounded-md">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Registration Fields */}
        {state === "register" && (
          <>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                USER ID
              </label>
              <input
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Choose a unique User ID"
                className="w-full px-4 py-3 rounded-lg bg-[#14182e] border border-[#2b2f49] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] placeholder-gray-500 text-white"
                type="text"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                FULL NAME
              </label>
              <input
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg bg-[#14182e] border border-[#2b2f49] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] placeholder-gray-500 text-white"
                type="text"
                required
                disabled={submitting}
              />
            </div>
          </>
        )}

        {/* Common Fields */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            EMAIL
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 rounded-lg bg-[#14182e] border border-[#2b2f49] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] placeholder-gray-500 text-white"
            type="email"
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            PASSWORD
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={state === "login" ? "Enter your password" : "Create a password"}
            className="w-full px-4 py-3 rounded-lg bg-[#14182e] border border-[#2b2f49] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] placeholder-gray-500 text-white"
            type="password"
            required
            disabled={submitting}
            minLength="6"
          />
        </div>

        {/* Forgot Password Link - ONLY SHOW IN LOGIN MODE */}
        {state === "login" && (
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors bg-transparent border-none"
              disabled={submitting}
            >
              Forgot your password?
            </button>
          </div>
        )}

        {/* Switch Link */}
        <p className="text-sm text-center text-gray-400">
          {state === "register" ? "Already have an account?" : "New user?"}{" "}
          <button
            type="button"
            onClick={switchState}
            className="text-[#3b82f6] font-medium hover:underline transition-colors bg-transparent border-none"
            disabled={submitting}
          >
            {state === "register" ? "Sign In" : "Create Account"}
          </button>
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-[#1e3a8a] text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Please wait...
            </>
          ) : (
            <>
              {state === "login" ? "🔒" : "🚀"}
              {state === "register" ? "CREATE ACCOUNT" : "ACCESS SYSTEM"}
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;