import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Logging out the user
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Expense Tracker
        </div>
        <nav className="flex-1">
          <ul className="mt-4 space-y-2">
            <li className="p-2 hover:bg-gray-700">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
              <Link to="/add-expense">Add Expense</Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
              <Link to="/expense-report">Expense Report</Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
              <Link to="/manage-categories">Manage Categories</Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
              <Link to="/search-expenses">Search Expenses</Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 m-4 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Account</h1>
          <div className="flex items-center space-x-4">
            <div className="text-gray-700">{user && user.email}</div>
            <img
              src="/Account Icon.png" // Make sure this image is placed in the public folder
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


