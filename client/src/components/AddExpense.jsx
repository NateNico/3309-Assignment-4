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

    try {
      const response = await fetch('http://localhost:5000/api/expenses/add', {
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

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
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
      } else {
        console.error('Non-JSON response:', await response.text());
        alert('An error occurred while processing your request.');
      }
    } catch (error) {
      console.error('Error in submit:', error);
      alert('Error submitting expense: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-6">
        <Header />
        <div className="mt-6">
          <h3 className="text-2xl font-bold">Add Expense</h3>
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
              className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
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

