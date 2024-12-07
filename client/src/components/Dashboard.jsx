import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="w-3/4 p-6"
        style={{
          backgroundImage: `url(/dashboard.jpg)`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Header />
        <div className="mt-6">
          <h3 className="text-2xl font-bold">Dashboard</h3>
          {/* Your content for the dashboard */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

