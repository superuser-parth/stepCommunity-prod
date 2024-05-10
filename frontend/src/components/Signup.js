// Signup.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

const Signup = () => {
  
  const navigate=useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation

    try {
      // Make API request to register user
      const response = await fetch('https://stepcommunity-prod.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message); 
      } else {
 
        alert('User registered successfully!');
        navigate('/login')
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  return (
    <div>
        <Link to="/" className="text-blue-500 hover:underline">Back</Link>  
   
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      
      <h2 className="text-2xl mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
       
        <button
          type="submit"
          className="w-full block w-full border-solid border-2 border-black hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-md focus:outline-none"
        >
          Signup
        </button>

        <div className="text-center mt-5">
      <Link to='/login' className="text-blue-500 hover:underline">Already a User? Log in</Link>
    </div>
      </form>
    </div>
    </div>
  );
};

export default Signup;
