import React from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="w-3/4"
        style={{
          backgroundImage: `url(/dashboard.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        }}
      >
        {/* If you want to add a header or other top elements, do it here */}
        <div className="mt-6 p-6">
          {/* Your content for the dashboard goes here */}
          {/* The p-6 adds spacing but no white lines since no contrasting bg color */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


