import React from 'react';
import { isAuthenticated } from './AuthContext';
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  let auth = isAuthenticated();
return (
    auth? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoute