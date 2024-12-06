import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const userId = 1; // Replace with actual user ID
    axios.get(`http://localhost:5000/api/expenses/user/${userId}`)
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.ExpenseID}>
              <td>{exp.Date}</td>
              <td>{exp.CategoryID}</td>
              <td>{exp.Amount}</td>
              <td>{exp.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
