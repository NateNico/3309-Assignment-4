import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext'; // Import context provider

// Import your components
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute';

// New Components for your Dashboard and other functionalities
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import ExpenseReport from './components/ExpenseReport';
import ManageCategories from './components/ManageCategories';
import SearchExpenses from './components/SearchExpenses';
import SpendingAnalysis from './components/SpendingAnalysis';

function App() {
  const location = useLocation();
  const [showEmail, setShowEmail] = useState(false);

  const handleIconClick = () => {
    setShowEmail((prev) => !prev);
  };

  return (
    <AuthContextProvider>
      <div className="bg-background min-h-screen text-textColor font-sans">
        {/* Conditionally render the title and account icon bar */}
        {location.pathname !== '/dashboard' && (
          <div className="flex justify-between items-center p-4 bg-gray-100">
            {/* Title on the left (unchanged classes and text) */}
            <h1 className="title">Expense Tracker Web</h1>

            {/* Only show the account icon if the user is NOT on the login or signup page */}
            {/* This means it won't show on '/', '/signup' pages and will appear on other routes (after login) */}
            {location.pathname !== '/' && location.pathname !== '/signup' && (
              <div>
                <img
                  src="/Account Icon.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer mr-2"
                  onClick={handleIconClick}
                />
                {showEmail && <span className="text-black">User Email</span>}
              </div>
            )}
          </div>
        )}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-expense"
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense-report"
            element={
              <ProtectedRoute>
                <ExpenseReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-categories"
            element={
              <ProtectedRoute>
                <ManageCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search-expenses"
            element={
              <ProtectedRoute>
                <SearchExpenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/spending-analysis"
            element={
              <ProtectedRoute>
                <SpendingAnalysis />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;


