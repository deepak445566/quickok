import React from 'react';
import { useAppContext } from '../../context/AppContext';


function UserHome() {
  const { user } = useAppContext();

  console.log("UserHome rendered - User:", user); // ✅ Debug log

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Your Dashboard, {user.fullname}! 🎉
          </h1>
          <p className="text-xl text-gray-300">
            User ID: <span className="text-blue-400">{user.userId}</span> | 
            Email: <span className="text-blue-400">{user.email}</span>
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Profile Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Profile Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400">Full Name</p>
                <p className="text-white font-medium">{user.fullname}</p>
              </div>
              <div>
                <p className="text-gray-400">User ID</p>
                <p className="text-white font-medium">{user.userId}</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition font-medium">
                📝 Edit Profile
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg transition font-medium">
                ⚙️ Settings
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg transition font-medium">
                💬 Support
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Account Status</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400">Member Since</p>
                <p className="text-white font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <p className="text-green-400 font-medium">✅ Active</p>
              </div>
              <div>
                <p className="text-gray-400">Last Login</p>
                <p className="text-white font-medium">Just now</p>
              </div>
            </div>
          </div>

        </div>

        {/* Welcome Message */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">Welcome to StellarServe Indexing Tool! 🚀</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Hello <span className="text-blue-400 font-semibold">{user.fullname}</span>, 
            we're excited to have you on board. This is your personalized dashboard where 
            you can manage your indexing projects, track progress, and access all the 
            powerful tools we offer.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition">
              Get Started
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition">
              View Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;