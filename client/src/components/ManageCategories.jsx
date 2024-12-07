import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

const ManageCategories = () => {
  const { user } = UserAuth();
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  // Updated fetchCategories function with error handling
  const fetchCategories = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/categories/user/${user.uid}`);
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setLoading(false);
  };

  // Fetch categories when the component mounts or when the user changes
  useEffect(() => {
    fetchCategories();
  }, [user]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!user || !newCategoryName.trim()) return;

    setLoading(true);
    const res = await fetch('/api/categories/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.uid, name: newCategoryName }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setNewCategoryName('');
      fetchCategories();
    } else {
      alert('Error adding category.');
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
          <h3 className="text-2xl font-bold">Manage Categories</h3>
          <form onSubmit={handleAddCategory}>
            <input
              type="text"
              placeholder="New Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </form>

          <h3>Your Categories:</h3>
          {loading ? <p>Loading...</p> : null}
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;






