// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './lib/ProtectedRoute';
import AdminRoute from './lib/AdminRoute';
import MyProfile from './components/MyProfile';
import Explore from './components/Explore'
import CreateJob from './components/CreateJob';
import EditJob from './components/EditJob';
import EditProfile from './components/EditProfile';
import Applicant from './components/Applicants';
import Affiliate from './components/Business/Affiliate';
import MarketPlace from './components/Business/MarketPlace';
import JobDetails from './components/JobDetails';
import AdminDashboard from './components/Admin/AdminDashboard'
import AdminLogin from './components/Admin/AdminLogin';
import AdminBrowse from './components/Admin/AdminBrowse';
import AddProduct from './components/Admin/AddProduct';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/adminlogin' element={<AdminLogin/>}/>

          <Route element={<ProtectedRoute/>}>
              <Route path='/job-details/:id' element={<JobDetails/>}/>
              <Route path='/affiliate' element={<Affiliate/>} />
              <Route path='/marketplace' element={<MarketPlace/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/myprofile' element={<MyProfile/>} />
              <Route path='/explore' element={<Explore/>} />
              <Route path='/createjob' element={<CreateJob/>} />
              <Route path='/editjob' element={<EditJob/>} />
              <Route path='/editprofile' element={<EditProfile/>} />
              <Route path='/applicants' element={<Applicant/>}/>
           
          </Route>

          <Route element={<AdminRoute/>}>
            <Route path='/admindashboard' element={<AdminDashboard/>}/>
            <Route path='/adminbrowse' element={<AdminBrowse/>}/>
            <Route path='/addproduct' element={<AddProduct/>}/>
          </Route>

        </Routes>
      </div>
    </Router>
  );
};


export default App;
