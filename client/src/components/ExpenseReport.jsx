import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

const ExpenseReport = () => {
  const { user } = UserAuth();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the expense report data when the user is logged in
  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(`/api/expenses/report/${user.uid}`)
        .then(res => res.json())
        .then(data => {
          setReportData(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <Header />
        <div className="mt-6">
          <h3 className="text-2xl font-bold"> </h3>

          {/* Loading or data display */}
          {loading ? (
            <p>Loading...</p>
          ) : reportData ? (
            <div>
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">Expenses</th>
                    <th className="border px-4 py-2 text-left">April</th>
                    <th className="border px-4 py-2 text-left">May</th>
                    <th className="border px-4 py-2 text-left">June</th>
                    <th className="border px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((expense, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{expense.name}</td>
                      <td className="border px-4 py-2">${expense.april}</td>
                      <td className="border px-4 py-2">${expense.may}</td>
                      <td className="border px-4 py-2">${expense.june}</td>
                      <td className="border px-4 py-2">${expense.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-right mt-4">
                Total Expenses: ${reportData.reduce((sum, expense) => sum + expense.total, 0)}
              </p>
            </div>
          ) : (
            <p>No report data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseReport;







