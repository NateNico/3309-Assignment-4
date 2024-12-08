import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

const ExpenseReport = () => {
  const { user } = UserAuth();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(`http://localhost:5000/api/expenses/report/${user.uid}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch expense report');
          }
          return res.json();
        })
        .then((data) => {
          setReportData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) return <p>Please sign in.</p>;
  if (loading) return <p>Loading...</p>;
  if (!reportData || reportData.length === 0) return <p>No report data available.</p>;

  const yearlyTotal = reportData.reduce((sum, expense) => sum + expense.total, 0);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-6">
        <Header />
        <div className="mt-6">
          <h3 className="text-2xl font-bold">Expense Report</h3>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Category</th>
                <th className="border px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((expense, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{expense.name}</td>
                  <td className="border px-4 py-2">${expense.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-right mt-4 font-bold">
            Total Expenses for the Year: ${yearlyTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseReport;



