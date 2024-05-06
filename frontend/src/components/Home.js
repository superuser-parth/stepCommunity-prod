import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import HomeFooter from './HomeFooter';

const Home = () => {
  const navigate = useNavigate();


  return (
    <div>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl mb-6">Welcome to stepCommunity.</h1>
        <p className="mb-4">Please login or sign up to access the portal:</p>
        <div className="mb-4">
          <Link to="/login" className="block w-full border-solid border-2 border-black hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-md text-center">
            Login
          </Link>
        </div>
        <div>
          <Link to="/signup" className="block w-full border-solid border-2 border-black hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-md text-center">
            Sign Up
          </Link>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default Home;
