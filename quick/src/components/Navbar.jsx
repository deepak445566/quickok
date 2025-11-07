import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, setShowLogin, setUser , loading } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const openMenuHandler = () => setIsMenuOpen(true);
  const closeMenuHandler = () => setIsMenuOpen(false);
  
  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const goToUserHome = () => {
    navigate('/userhome');
  };

  if (loading) {
    return (
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 backdrop-blur text-white text-sm min-h-[13vh] w-screen">
        <a href="#" className="flex items-center gap-1">
          <h1 className="orbi text-lg">StellarServe Indexing Tool</h1>
        </a>
        <div className="text-white">Loading...</div>
      </nav>
    );
  }

  return (
   <>
     <nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-white text-sm min-h-[13vh] w-screen">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1">
          <h1 className="orbi text-lg">StellarServe Indexing Tool</h1>
        </a>

        {/* ✅ UPDATED: Desktop Nav Links - Conditional based on login */}
        <div className="hidden md:flex items-center gap-6 transition duration-500 orbi">
          {/* Always show Home */}
          <a href="/" className="hover:text-purple-500 transition">
            Home
          </a>

          {/* Show these only when user is logged in */}
          {user && (
            <>
              <button 
                onClick={goToUserHome}
                className="hover:text-purple-500 transition bg-transparent border-none cursor-pointer"
              >
                Dashboard
              </button>
              <a href="/submitlinks" className="hover:text-purple-500 transition">
                Submit Links
              </a>
              <a href="/history" className="hover:text-purple-500 transition">
                History
              </a>
              <a href="/credits" className="hover:text-purple-500 transition">
                Credits
              </a>
              <a href="/account" className="hover:text-purple-500 transition">
                Account
              </a>
            </>
          )}
        </div>

        {/* ✅ UPDATED: Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-white text-sm">Welcome, {user.fullname}</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 transition-all rounded-xl text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-95 transition-all rounded-xl text-sm" 
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={openMenuHandler}
          className="md:hidden active:scale-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* ✅ UPDATED: Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#05091A] text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-6 md:hidden transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Always show Home */}
        <a href="/" onClick={closeMenuHandler} className="hover:text-purple-500 transition">
          Home
        </a>

        {/* Show these only when user is logged in */}
        {user && (
          <>
            <button 
              onClick={() => { goToUserHome(); closeMenuHandler(); }}
              className="hover:text-purple-500 transition bg-transparent border-none cursor-pointer text-lg"
            >
              Dashboard
            </button>
            <a href="/submitlinks" onClick={closeMenuHandler} className="hover:text-purple-500 transition">
              Submit Links
            </a>
            <a href="/history" onClick={closeMenuHandler} className="hover:text-purple-500 transition">
              History
            </a>
            <a href="/credits" onClick={closeMenuHandler} className="hover:text-purple-500 transition">
              Credits
            </a>
            <a href="/account" onClick={closeMenuHandler} className="hover:text-purple-500 transition">
              Account
            </a>
          </>
        )}

        {/* Login/Logout Buttons */}
        {user ? (
          <div className="flex flex-col gap-4 items-center mt-4">
            <span className="text-white text-center">
              Welcome,<br/>{user.fullname}
            </span>
            <button 
              onClick={() => { handleLogout(); closeMenuHandler(); }}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 transition-all rounded-xl"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            className="px-8 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] transition-all rounded-xl mt-4" 
            onClick={() => { handleLogin(); closeMenuHandler(); }}
          >
            Login
          </button>
        )}

        {/* Close Button */}
        <button
          onClick={closeMenuHandler}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-purple-600 hover:bg-purple-700 transition text-white rounded-md flex mt-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
   </>
  )
}

export default Navbar