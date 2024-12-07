import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';

const ManageCategories = () => {
  const { user } = UserAuth();
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const fetchCategories = async () => {
    if (!user) return;
    const res = await fetch(`/api/categories/user/${user.uid}`);
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, [user]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!user || !newCategoryName.trim()) return;
    const res = await fetch('/api/categories/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.uid, name: newCategoryName }),
    });
    const data = await res.json();
    if (data.success) {
      setNewCategoryName('');
      fetchCategories();
    } else {
      alert('Error adding category.');
    }
  };

  const handleEditCategory = async (categoryId) => {
    setEditCategoryId(categoryId);
    const category = categories.find((c) => c.id === categoryId);
    if (category) setEditCategoryName(category.name);
  };

  const handleSaveEdit = async () => {
    if (!editCategoryName.trim()) return;
    const res = await fetch('/api/categories/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId: user.uid, 
        categoryId: editCategoryId, 
        name: editCategoryName 
      }),
    });
    const data = await res.json();
    if (data.success) {
      setEditCategoryId(null);
      setEditCategoryName('');
      fetchCategories();
    } else {
      alert('Error editing category.');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) return;

    const res = await fetch('/api/categories/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.uid, categoryId }),
    });
    const data = await res.json();
    if (data.success) {
      fetchCategories();
    } else {
      alert('Error deleting category.');
    }
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          required
        />
        <button type="submit">Add Category</button>
      </form>

      <h3>Your Categories:</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {editCategoryId === cat.id ? (
              <>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditCategoryId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {cat.name}{' '}
                <button onClick={() => handleEditCategory(cat.id)}>Edit</button>{' '}
                <button onClick={() => handleDeleteCategory(cat.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;


