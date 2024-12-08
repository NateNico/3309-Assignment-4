import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

const Account = () => {
  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Account</h1>
          <div className="flex items-center space-x-4">
            <div className="text-gray-700">{user && user.email}</div>
            <img
              src="/profile-pic.jpg" // Update this to the path of your image
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Content for the Account Page */}
        <div className="mt-8 bg-white shadow rounded p-6">
          <h3 className="text-xl font-semibold">Welcome to your account page!</h3>
          <p className="mt-4 text-gray-700">You can manage your expenses here.</p>
        </div>
      </div>
    </div>
  );
};

export default Account;


