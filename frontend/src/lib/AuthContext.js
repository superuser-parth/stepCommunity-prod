import React from 'react';
import { jwtDecode } from 'jwt-decode' 


//Store token to local storage
export const storeToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };
  
  //Retrieve from local storage
  export const getToken = () => {
    
    const token=localStorage.getItem('jwtToken');
    return token;
  };
  
  //Remove from local storage
  export const removeToken = () => {
    localStorage.removeItem('jwtToken');
  };

  export const decodeToken = (token) => {
    const decoded = jwtDecode(token)
    return decoded
  }

  export const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return false; // No token found
    }
  
    // Decode the token to extract expiration time
    const decodedToken = decodeToken(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  
    // Check if the token has expired
    if (decodedToken.exp < currentTime) {
      // Token has expired
      return false;
    }
  
    // Token is valid
    return true;
  };
  
  export const isAdmin=()=>{
     const token = localStorage.getItem('jwtToken')
     if(!token){
      return false; 
     }

     //Decode token to extract user type
     const decodedToken = decodeToken(token);
     const userType = decodedToken.userType

     //check if user is admin   
     if(userType!='admin'){
      return false;
     }

     const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  
    // Check if the token has expired
    if (decodedToken.exp < currentTime) {
      // Token has expired
      return false;
    }

     return true
  }