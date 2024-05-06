// Login.js
import React, { useState } from 'react';
import {storeToken} from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://stepcommunity-prod.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Handle error response
        const errorData = await response.json();
        alert(errorData.message); 
      } else {

        const data = await response.json();

        if(data.token){
        storeToken(data.token);
        navigate('/dashboard');
        }else{
          alert('Token not found')
        }

      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div>
     
      <a href="/" className="text-blue-500 hover:underline">Back</a>  
     
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button onClick={handleLogin} className="w-fullblock w-full border-solid border-2 border-black hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-md focus:outline-none">
        Login
      </button>

      <div className="text-center mt-5">
      <a href='/signup' className="text-blue-500 hover:underline">New User? Sign Up</a>
    </div>
    </div>
   
    </div>
  );
};

export default Login;