import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { removeToken } from '../../lib/AuthContext';

const AdminNavbar = () => {
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = () => {
    removeToken();
    window.location.href = '/';
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowConfirmLogout(false);
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 ml-10">
          <Link to="/admindashboard" className="text-white hover:text-gray-300 text-xl font-bold">
            stepCommunity.
          </Link>
        </div>
        <ul className="hidden lg:flex items-center space-x-4 mr-24 flex">
          <li>
            <Link to="/adminbrowse" className="text-white hover:text-gray-300 ml-4">
              Marketplace
            </Link>
          </li>
          <li>
            <Link to="/polls" className="text-white hover:text-gray-300 ml-4">
              Polls
            </Link>
          </li>
          <li>
            <Link to="/requests" className="text-white hover:text-gray-300 ml-4">
              Requests
            </Link>
          </li>
          <li>
            <button className="text-white hover:text-gray-300 ml-4" onClick={() => setShowConfirmLogout(true)}>
              Logout
            </button>
          </li>
        </ul>
      </div>
      {showConfirmLogout && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-4 rounded-lg text-black z-20">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-center mt-4">
              <button className="bg-red-500 text-white px-4 py-2 mr-4 rounded-lg" onClick={handleConfirmLogout}>Yes</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowConfirmLogout(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
