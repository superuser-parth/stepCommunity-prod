// Logout.js
import React from 'react';
import {removeToken} from '../lib/AuthContext';

const Logout = () => {
  const handleLogout = () => {
    removeToken();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
