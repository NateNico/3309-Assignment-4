import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

const SearchExpenses = () => {
  const { user } = UserAuth();
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    // Updated the fetch URL to include http://localhost:5000
    const res = await fetch('http://localhost:5000/api/expenses/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.uid,
        category,
        startDate,
        endDate,
        minAmount,
        maxAmount,
      }),
    });

    const data = await res.json();
    setLoading(false);
    setResults(data);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-6">
        <Header />
        <div className="mt-6">
          <h3 className="text-2xl font-bold">Search Expenses</h3>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit" disabled={loading} style={{ padding: '5px 10px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>
              {loading ? 'Searching...' : 'Search Results'}
            </button>
          </form>

          <h2 className="text-2xl font-bold"> Results: </h2>
          {results.length > 0 ? (
            <ul>
              {results.map((exp) => (
                <li key={exp.id}>
                  {new Date(exp.date).toLocaleDateString()} - {exp.category}: ${exp.amount} ({exp.description})
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchExpenses;


