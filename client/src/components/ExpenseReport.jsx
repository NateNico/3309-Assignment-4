import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';

function ExpenseReport() {
  const { user } = UserAuth();
  const [reportType, setReportType] = useState('category');
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`/api/expenses/report/${user.uid}/${reportType}`)
        .then(res => res.json())
        .then(data => setReportData(data))
        .catch(err => console.log(err));
    }
  }, [user, reportType]);

  return (
    <div>
      <h2>Expense Report</h2>
      <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
        <option value='category'>By Category</option>
        <option value='month'>By Month</option>
      </select>
      {reportData && Object.entries(reportData).map(([key, value]) => (
        <div key={key}>{key}: {value}</div>
      ))}
    </div>
  );
}

export default ExpenseReport;

