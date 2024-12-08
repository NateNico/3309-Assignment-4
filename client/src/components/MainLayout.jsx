import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const location = useLocation();

  const pageTitle = () => {
    switch(location.pathname) {
        case '/Dashboard':
        return "Dashboard";
      case '/add-expense':
        return "Add Expense";
      case '/expense-report':
        return "Expense Report";
      case '/manage-categories':
        return "Manage Categories";
      case '/search-expenses':
        return "Search Expenses";
      default:
        return "";
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-6">
        <Header />
        <div className="mt-6">
          <h3 className="text-2xl font-bold">{pageTitle()}</h3>
          {/* Render the appropriate content for the current page */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;


