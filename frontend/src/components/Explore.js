import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { decodeToken, getToken } from '../lib/AuthContext';

const Explore = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = String(getToken());
      const decodedToken = decodeToken(token);

      let response;
      if (decodedToken.userType === 'paid') {
        response = await axios.get('http://localhost:4444/api/getJobs', {
          headers: {
            Authorization: `${token}`
          }
        });
      } else {
        response = await axios.get('http://localhost:4444/api/getJobsBySkill', {
          headers: {
            Authorization: `${token}`
          }
        });
      }
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filter jobs based on search term
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(job.skillsRequired) && job.skillsRequired.join(', ').toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredJobs(filtered);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4 max-w-3xl shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Explore Jobs</h2>
          <a href="/createjob" className=" hover:bg-slate-200 text-black font-bold py-2 px-4 rounded focus:outline-none border border-black">
            Create Job
          </a>
        </div>
  
        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search jobs..."
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
  
        <div className="divide-y divide-gray-300">
          {filteredJobs.map(job => (
            <div key={job._id} className="py-6 border rounded-md p-4 relative flex flex-col md:flex-row md:items-end md:justify-between">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                <p className="text-gray-600">{job.jobType}</p>
                {job.jobType === 'Full-Time' &&
                  <p className="text-gray-600 mt-1">Salary: {job.salary} LPA</p>
                }
                {job.jobType === 'Internship' &&
                  <>
                    <p className="text-gray-600 mt-1">Stipend: ₹ {job.stipend}</p>
                    <p className="text-gray-600 mt-1">Duration: {job.duration} Months</p>
                  </>
                }
                <p className="text-gray-700 mt-1">Location: {job.location}</p>
                <p className="text-gray-700 mt-1">Contact: {job.contactInformation}</p>
                <p className="text-gray-700 mt-1">Skills Required: {job.skillsRequired.join(', ')}</p>
              </div>
              <button
                onClick={() => window.open(`/job-details/${job._id}`, '_blank')}
                className="bg-white border border-black hover:bg-slate-200 text-black py-2 px-4 rounded focus:outline-none mt-4 md:mt-0 md:ml-4"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
  
  
  
};

export default Explore;
