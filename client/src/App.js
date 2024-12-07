import React from 'react';
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
  
  return (
    <AuthContextProvider>
      <div className="bg-background min-h-screen text-textColor font-sans">
        {/* Conditionally render the title */}
        {location.pathname !== '/dashboard' && (
          <h1 className="text-center text-4xl font-bold text-primary py-8">
            Expense Tracker Web
          </h1>
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



