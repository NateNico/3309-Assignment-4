import React from 'react';
import ExpenseList from './Expenses/ExpenseList';
import AddExpense from './Expenses/AddExpense';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <AddExpense />
      <ExpenseList />
    </div>
  );
};

export default Dashboard;
