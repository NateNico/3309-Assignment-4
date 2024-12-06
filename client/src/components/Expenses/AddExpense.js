import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddExpense = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const userId = 1; // Replace with actual user ID
    axios.get(`http://localhost:5000/api/categories/user/${userId}`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = 1; // Replace with actual user ID
    axios.post('http://localhost:5000/api/expenses/add', {
      userId,
      categoryId,
      amount,
      date,
      description,
    })
      .then(res => alert(res.data.message))
      .catch(err => alert(err.response.data.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <select onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.CategoryID} value={cat.CategoryID}>{cat.Name}</option>
        ))}
      </select>
      <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} required />
      <input type="date" onChange={(e) => setDate(e.target.value)} required />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
