import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-gray-800 text-white h-screen flex flex-col">
      <div className="py-6 px-4">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <nav className="mt-8 flex-grow">
          <ul>
            <li><Link to="/dashboard" className="block py-2">Dashboard</Link></li>
            <li><Link to="/add-expense" className="block py-2">Add Expense</Link></li>
            <li><Link to="/expense-report" className="block py-2">Expense Report</Link></li>
            <li><Link to="/manage-categories" className="block py-2">Manage Categories</Link></li>
            <li><Link to="/search-expenses" className="block py-2">Search Expenses</Link></li>
          </ul>
        </nav>
      </div>
      
      {/* Logout Button placed at the bottom */}
      <div className="mt-auto py-4">
        <button className="bg-red-500 text-white py-2 px-4 w-48 mx-auto hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


