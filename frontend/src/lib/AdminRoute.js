import React from 'react';
import { isAdmin} from './AuthContext';
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  let auth = isAdmin();
return (
    auth? <Outlet/> : <Navigate to='/adminlogin'/>
  )
}

export default AdminRoute