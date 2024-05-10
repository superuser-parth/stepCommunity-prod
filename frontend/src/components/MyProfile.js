import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../lib/AuthContext';
import Navbar from './Navbar';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const token = String(getToken());
      const response = await axios.get('https://stepcommunity-prod.onrender.com/api/byMe', {
        headers: {
          Authorization: `${token}`
        }
      });
      setJobs(response.data);

    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (jobId) => {
    
      navigate('/editjob');
  };

  const handleDelete = async (jobId) => {
    try {
      const token = getToken();
      await axios.delete(`https://stepcommunity-prod.onrender.com/api/deletejob/${jobId}`,{
        headers:{
          Authorization:token
        }
      });
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-4">My Profile</h2>
          
          <a href="/editprofile" className="bg-white hover:bg-slate-300 text-black font-bold py-4 px-4 rounded focus:outline-none border border-blue-500 mr-4">
            Edit Profile
          </a>
        </div>
  
        <h3 className="text-xl font-semibold mb-2">My Jobs</h3>
        <div className="divide-y divide-gray-300">
          {jobs.map(job => (
            <div key={job._id} className="py-6 border rounded-md p-4">
              <div>
                <strong className="font-semibold">Title:</strong> {job.title}
              </div>
              <div>
                <strong className="font-semibold">Type:</strong> {job.jobType}
              </div>
              {job.jobType === 'Full-Time' &&
                <div className="mt-1">
                  <strong className="font-semibold">Salary:</strong> {job.salary} LPA
                </div>
              }
              {job.jobType === 'Internship' &&
                <div className="mt-1">
                  <strong className="font-semibold">Stipend:</strong> ₹ {job.stipend}
                </div>
              }
              {job.jobType === 'Internship' &&
                <div className="mt-1">
                  <strong className="font-semibold">Duration:</strong> {job.duration} Months
                </div>
              }
              
              <div className="mt-1">
                <strong className="font-semibold">Location:</strong> {job.location}
              </div>
              <div className="mt-1">
                <strong className="font-semibold">Contact:</strong> {job.contactInformation}
              </div>
              <div className="mt-1">
                <strong className="font-semibold">Skills Required:</strong> {job.skillsRequired.join(', ')}
              </div>
              <div className="mt-4 flex">
                <button
                  className="bg-white hover:bg-slate-300 text-black font-bold py-2 px-4 rounded focus:outline-none border border-blue-500 mr-4"
                  onClick={() => handleEdit(job._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-white hover:bg-slate-300 text-black font-bold py-2 px-4 rounded focus:outline-none  border border-red-500"
    
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default MyProfile;