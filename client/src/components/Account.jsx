import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

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
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email: {user && user.email}</p>
      <button
        onClick={handleLogout}
        className='border px-6 py-2 my-4'>
        Logout
      </button>

      <div className='mt-6'>
        <h2 className='text-xl font-bold mb-4'>Navigate:</h2>
        <ul className='list-disc pl-5'>
          <li><Link to='/add-expense'>Add Expense</Link></li>
          <li><Link to='/expense-report'>View Expense Report</Link></li>
          <li><Link to='/manage-categories'>Manage Categories</Link></li>
          <li><Link to='/search-expenses'>Search Expenses</Link></li>
          <li><Link to='/spending-analysis'>Spending Analysis</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Account;


