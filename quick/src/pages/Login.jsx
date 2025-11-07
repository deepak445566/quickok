import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx'; // ✅ Correct import

function Login() {
  const { setShowLogin, setUser, fetchUser, loading, axios } = useAppContext();
  const navigate = useNavigate();
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    userId: "",
    fullname: "", // ✅ Changed from fullName to fullname
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
    // ✅ CORRECTED: Backend के according payload
    let payload, endpoint;
    
    if (state === "register") {
      payload = { 
        userId: formData.userId,      // ✅ userId field (not username)
        fullname: formData.fullname,  // ✅ fullname field (not name)
        email: formData.email, 
        password: formData.password 
      };
      endpoint = '/api/auth/register'; // ✅ Correct endpoint
    } else {
      payload = { 
        email: formData.email, 
        password: formData.password 
      };
      endpoint = '/api/auth/login'; // ✅ Correct endpoint
    }

    console.log("🔄 Sending auth request...", payload);
    
    const { data } = await axios.post(endpoint, payload);

    console.log("✅ Auth response:", data);

    if (data.success && data.token) {
      console.log("💾 Storing token and user data...");
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      console.log("📦 Token stored:", data.token.substring(0, 20) + "...");
      console.log("👤 User stored:", data.user);
      
      setUser(data.user);
      setShowLogin(false);
      
      // ✅ FIXED: Navigate to /userhome instead of /
      navigate('/userhome'); // 🚀 CHANGE THIS LINE
      resetForm();
      
      setTimeout(() => {
        fetchUser();
      }, 500);
      
    } else {
      console.log("❌ Auth failed:", data.message);
      setError(data.message || "Authentication failed");
    }
  } catch (error) {
    console.error("🚨 Auth error:", error);
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        "Something went wrong";
    setError(errorMessage);
  } finally {
    setSubmitting(false);
  }
};

  const resetForm = () => {
    setFormData({
      userId: "",
      fullname: "", // ✅ Changed from fullName to fullname
      email: "",
      password: "",
    });
    setError("");
  };

  const handleClose = () => {
    setShowLogin(false);
    resetForm();
  };

  const switchState = () => {
    setState(state === "login" ? "register" : "login");
    setError("");
    resetForm(); // ✅ Reset form when switching
  };

  if (loading) {
    return null;
  }

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all"
    >
      <form
        onSubmit={onSubmitHandle}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#101427] backdrop-blur-md shadow-2xl border border-[#1f2236] p-8 py-10 rounded-2xl w-[90%] max-w-md flex flex-col gap-5 animate-fadeIn"
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

        {error && (
          <div className="w-full p-3 bg-red-900/20 border border-red-700 rounded-md text-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {state === "register" && (
          <>
            {/* USER ID */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300 tracking-wider">
                USER ID
              </label>
              <input
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Choose a unique User ID"
                className="w-full px-4 py-3 rounded-lg bg-[#14182e] border border-[#2b2f49] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] placeholder-gray-500 text-sm text-white"
                type="text"
                required
                disabled={submitting}
              />
            </div>

            {/* FULL NAME */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300 tracking-wider">
                FULL NAME
              </label>
              <input
                name="fullname" // ✅ Changed from fullName to fullname
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg bg-[#14182e] border border-[#2b2f49] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] placeholder-gray-500 text-sm text-white"
                type="text"
                required
                disabled={submitting}
              />
            </div>
          </>
        )}

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300 tracking-wider">
            EMAIL
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 rounded-lg bg-[#14182e] border border-[#2b2f49] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] placeholder-gray-500 text-sm text-white"
            type="email"
            required
            disabled={submitting}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300 tracking-wider">
            PASSWORD
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={state === "login" ? "Enter your password" : "Create a password"}
            className="w-full px-4 py-3 rounded-lg bg-[#14182e] border border-[#2b2f49] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] placeholder-gray-500 text-sm text-white"
            type="password"
            required
            disabled={submitting}
          />
        </div>

        {/* Switch Login/Register */}
        <p className="text-sm text-center text-gray-400">
          {state === "register" ? "Already have an account?" : "New user?"}{" "}
          <span
            onClick={switchState}
            className="text-[#3b82f6] font-medium cursor-pointer hover:underline transition-colors"
          >
            {state === "register" ? "Sign In" : "Create Account"}
          </span>
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-[#1e3a8a] text-white font-semibold rounded-lg shadow-md transition-all active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          <span role="img" aria-label={state === "login" ? "lock" : "rocket"}>
            {state === "login" ? "🔒" : "🚀"}
          </span>
          {submitting ? "Please wait..." : (state === "register" ? "CREATE ACCOUNT" : "ACCESS SYSTEM")}
        </button>
      </form>
    </div>
  );
}

export default Login;