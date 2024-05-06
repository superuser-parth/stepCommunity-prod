// Dashboard.js
import React from 'react';
import Navbar from './Navbar';

const Dashboard = () => {
  return (
    <div>
     
      <Navbar />
   
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;
