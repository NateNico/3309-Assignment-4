import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';

const SearchExpenses = () => {
  const { user } = UserAuth();
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!user) return;
    const res = await fetch('/api/expenses/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.uid,
        category,
        startDate,
        endDate,
        minAmount,
        maxAmount
      }),
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <h2>Search Expenses</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <label>Min Amount: </label>
        <input
          type="number"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
        <label>Max Amount: </label>
        <input
          type="number"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h3>Search Results:</h3>
      {results.length > 0 ? (
        <ul>
          {results.map((exp) => (
            <li key={exp.id}>
              {exp.date.toDate ? exp.date.toDate().toDateString() : new Date(exp.date.seconds * 1000).toDateString()} - {exp.category}: ${exp.amount} ({exp.description})
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchExpenses;
