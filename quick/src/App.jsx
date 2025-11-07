import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";
import Home from "./components/Home";
import Type from "./components/Type";
import Process from "./components/Process";
import Phone from "./components/Phone";
import Pricing from "./components/Pricing";
import Payment from "./components/Payment";
import Fqs from "./components/Fqs";
import Start from "./components/Start";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import UserHome from "./pages/Container/UserHome";

function AppContent() {
  const { user, showLogin, loading } = useAppContext();

  // ✅ Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home page route */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Type />
              <Process />
              <Phone />
              <Pricing />
              <Payment />
              <Fqs />
              <Start />
              <Footer />
            </>
          }
        />

        {/* ✅ UserHome Route - Only show UserHome component */}
        <Route 
          path="/userhome" 
          element={
            user ? (
              <UserHome />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>

      {/* ✅ Login Modal */}
      {showLogin && <Login />}
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;