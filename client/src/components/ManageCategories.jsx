import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

const ManageCategories = () => {
  const { user } = UserAuth();
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/categories/user/${user.uid}`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [user]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!user || !newCategoryName.trim()) return;

    setLoading(true);
    const res = await fetch('http://localhost:5000/api/categories/add', {
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

  const handleDeleteCategory = async (categoryId) => {
    if (!user) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) return;

    setLoading(true);
    const res = await fetch('http://localhost:5000/api/categories/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.uid, categoryId }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.success) {
      fetchCategories();
    } else {
      alert(`Error deleting category: ${data.error}`);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-6">
        <Header />
        <div className="mt-6">
          <h3 className="text-2xl font-bold">Manage Categories</h3>
          <form onSubmit={handleAddCategory} style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="New Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
              style={{ marginRight: '10px', padding: '5px', borderRadius: '4px' }}
            />
            <button type="submit" disabled={loading} style={{ padding: '5px 10px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </form>

          <h3>Your Categories:</h3>
          {loading ? <p>Loading...</p> : null}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categories.map((cat) => (
              <li key={cat.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ flexGrow: 1 }}>{cat.name}</span>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  style={{
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;



