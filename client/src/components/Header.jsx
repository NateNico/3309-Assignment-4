import React from 'react';
import { UserAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = UserAuth();
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-white">Expense Tracker Web</h1>
      <div className="flex items-center">
        <span className="text-white mr-2">yigife5758@datingel.com</span>
        <img src="profile-pic.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default Header;



