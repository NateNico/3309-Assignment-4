import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

function AddExpense() {
  const { user } = UserAuth();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in first');
      return;
    }

    setLoading(true);
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
    setLoading(false);

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
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <Header />
        <div className="mt-6">
          <h3 className="text-2xl font-bold"> </h3>
          
          {/* Form for Adding Expense */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border rounded w-full"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-blue-500 text-purple rounded disabled:bg-gray-400"
            >
              {loading ? 'Submitting...' : 'Add Expense'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;


