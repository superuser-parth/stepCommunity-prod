import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../lib/AuthContext';
import Navbar from './Navbar';

const EditJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: '',
    description: '',
    about:'',
    location: '',
    contactInformation: '',
    jobType: '',
    salary: '', 
    stipend: '', 
    duration: '', 
    skillsRequired: []
  });


  const fetchJobs = async () => {
    try {
      const token = getToken();
      const response = await axios.get('http://localhost:4444/api/byMe', {
        headers: {
          Authorization: token
        }
      });
      // Update state with fetched job data
      setJob(response.data[0]); //Job is being returned as array of objects, first element accessed instead of using job.map

    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();  
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "skillsRequired") {
      // Append the new skill to the existing array of selected skills
      setJob(prevJob => ({
        ...prevJob,
        [name]: [...prevJob[name], value]
      }));
    } else {
      // For other fields, directly update the state
      setJob(prevJob => ({
        ...prevJob,
        [name]: value
      }));
    }
  };
  

  const handleRemoveSkill = (skillToRemove) => {
    setJob({
      ...job,
      skillsRequired: job.skillsRequired.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (event) => {
   event.preventDefault()
    try {
      const token = getToken();
      await axios.put(`http://localhost:4444/api/editJob/${job._id}`,job,{
        headers:{
          Authorization:token
        }
      });
      navigate('/dashboard'); // Redirect to dashboard after successful edit
    } catch (error) {
      console.error('Error editing job:', error);
    }
  };

  return (
    <div>
    <Navbar/>
  <div className="flex justify-center items-center ">
<div>
  <div className="container mx-auto p-4">
    <h2 className="text-3xl font-bold mb-4">Edit Job</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={job.title}
        onChange={handleChange}
        placeholder="Title"
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
      />
      <textarea
         name="description"
         value={job.description}
         onChange={handleChange}
        placeholder="Description"
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full resize-y"
      />
       <textarea        
        name="about company"
        value={job.about}
        onChange={handleChange}
        placeholder="About Company"
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full resize-y"
      />
      <input
        type="text"
        name="location"
        value={job.location}
        onChange={handleChange}
        placeholder="Location"
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
      />
      <input
        type="text"
        name="contactInformation"
        value={job.contactInformation}
        onChange={handleChange}
        placeholder="Contact Information"
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
      />
      <div className="mb-4">
        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
          Job Type:
        </label>
        <select
          name="jobType"
          value={job.jobType}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        >
          <option value="">Select job type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
      {job.jobType === 'Full-Time' && (
        <div className="mb-4">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary Range (LPA):
          </label>
          <div className="relative">
            <span className="absolute right-4 top-1 mt-1 mr-10 text-gray-500">LPA</span>
            <input
              type="number"
              name="salary"
              value={job.salary}
              onChange={handleChange}
              placeholder="Enter salary range"
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
        </div>
      )}
      {job.jobType === 'Internship' && (
        <div className="mb-4">
          <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">
            Stipend:
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1 mt-1 mr-2 text-gray-500">&#x20B9;</span>
            <input
              type="number"
              name="stipend"
              value={job.stipend}
              onChange={handleChange}
              placeholder="Enter stipend"
              className="pl-8 border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
        </div>
      )}
      {job.jobType === 'Internship' && (
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration:
          </label>
          <select
            name="duration"
            value={job.duration}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            <option value="">Select Internship Duration</option>
            <option value="1">1 month</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
            <option value="4">4 months</option>
            <option value="5">5 months</option>
            <option value="6">6 months</option>
          </select>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          Skills Required:
        </label>
        {/* Display selected skills as chips */}
        <div className="flex flex-wrap mb-2">
          { job.skillsRequired.map((skill, index) => (
            <div key={index} className="bg-blue-500 text-white font-semibold py-1 px-2 rounded mr-2 mb-2">
              {skill}
              <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2">
                x
              </button>
            </div>
          ))}
        </div>
        {/* Dropdown for selecting skills */}
        <select
          name="skillsRequired"
          value={job.skillsRequired}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        >
          <option value="">Select a skill</option>
          <option value="Web dev">Web dev</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Phone Marketing">Phone Marketing</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="Copywriting">Copywriting</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
      
      >
        Edit Job
      </button>
    </form>
  </div>
</div>
</div>
</div>
  );
};

export default EditJob;