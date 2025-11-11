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
// ✅ Correct import - use the original path
import Login from "./pages/Container/Login";

import SubmitLinks from "./pages/SubmitLinks";
import History from "./pages/Container/History";
import Dashboard from "./pages/Container/Dashboard";

// ✅ Add this import with other imports
import Grantaccess from "./pages/Container/Grantaccess";

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

        {/* ✅ Public Auth Routes - Accessible without login */}
        <Route path="/login" element={<Login />} />
       

        {/* ✅ Protected Routes - Only accessible when logged in */}
        <Route 
          path="/dashboard" 
          element={
            user ? <Dashboard /> : <Navigate to="/" replace />
          } 
        />
        
        <Route 
          path="/submitlinks" 
          element={
            user ? <SubmitLinks /> : <Navigate to="/" replace />
          } 
        />
        
        <Route 
          path="/history" 
          element={
            user ? <History /> : <Navigate to="/" replace />
          } 
        />
         <Route 
          path="/grantaccess" 
          element={
            user ? <Grantaccess/> : <Navigate to="/" replace />
          } 
        />
        
        

        {/* ✅ Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ✅ Login Modal - Only show when user is not logged in */}
      {showLogin && !user && <Login />}
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



  