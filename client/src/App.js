import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute';

// New Components
import AddExpense from './components/AddExpense';
import ExpenseReport from './components/ExpenseReport';
import ManageCategories from './components/ManageCategories';
import SearchExpenses from './components/SearchExpenses';
import SpendingAnalysis from './components/SpendingAnalysis';

function App() {
  return (
    <div>
      <h1 className='text-center text-3xl font-bold'>
        Expense Tracker Web
      </h1>
      <AuthContextProvider>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-expense'
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path='/expense-report'
            element={
              <ProtectedRoute>
                <ExpenseReport />
              </ProtectedRoute>
            }
          />
          <Route
            path='/manage-categories'
            element={
              <ProtectedRoute>
                <ManageCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path='/search-expenses'
            element={
              <ProtectedRoute>
                <SearchExpenses />
              </ProtectedRoute>
            }
          />
          <Route
            path='/spending-analysis'
            element={
              <ProtectedRoute>
                <SpendingAnalysis />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
