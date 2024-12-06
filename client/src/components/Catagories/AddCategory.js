import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = 1; // Replace with actual user ID
    axios.post('http://localhost:5000/api/categories/add', { userId, name })
      .then(res => alert(res.data.message))
      .catch(err => alert(err.response.data.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Category</h2>
      <input type="text" placeholder="Category Name" onChange={(e) => setName(e.target.value)} required />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategory;
