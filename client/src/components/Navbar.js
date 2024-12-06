import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/add-category">Add Category</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  );
};

export default Navbar;
