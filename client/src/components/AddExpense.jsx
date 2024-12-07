import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

function AddExpense() {
  const { user } = UserAuth();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in first');
      return;
    }

    const response = await fetch('/api/expenses/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.uid,
        amount,
        category,
        date,
        description,
      }),
    });
    const data = await response.json();
    if (data.success) {
      alert('Expense added successfully!');
      setAmount('');
      setCategory('');
      setDate('');
      setDescription('');
    } else {
      alert('Error adding expense: ' + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpense;

