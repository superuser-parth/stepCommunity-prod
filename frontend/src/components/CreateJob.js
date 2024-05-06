import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../lib/AuthContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../lib/AuthContext';
import ContentLock from './ContentLock';

const CreateJob = () => {

  const token=getToken();
  const decodedToken=decodeToken(token);
  const navigate = useNavigate();
  const [postCount, setPostCount] = useState()
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'skillsRequired') {
      // If skillsRequired, add to array
      setFormData({ ...formData, skillsRequired: [...formData.skillsRequired, value] });
    } else {
      // Otherwise, update form data normally
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGetCount = async()=>{
    try {
      const token = getToken();

     const response=await axios.get('https://stepcommunity-prod.onrender.com/api/byMe', {
        headers: {
          Authorization: token,
        },
      });
      
      setPostCount(response.data.length)

    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  useEffect(()=>{
    handleGetCount()
  })

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skillsRequired: formData.skillsRequired.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();

      await axios.post('https://stepcommunity-prod.onrender.com/api/addJob', formData, {
        headers: {
          Authorization: token,
        },
      });
      navigate('/explore');
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };


  if(decodedToken.userType==='paid' || postCount<2){
  return (
    <div>
      <Navbar/>
  
    <div className="flex justify-center items-center ">
  <div>
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Create Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange} // Implicit handling of event object
          placeholder="Title"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
        />
        <input
          type="text"
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="About Company"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
        />
         
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
        />
        <input
          type="text"
          name="contactInformation"
          value={formData.contactInformation}
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
            value={formData.jobType}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            <option value="">Select job type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        {formData.jobType === 'Full-Time' && (
          <div className="mb-4">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary Range (LPA):
            </label>
            <div className="relative">
              <span className="absolute right-4 top-1 mt-1 mr-10 text-gray-500">LPA</span>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter salary range"
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>
        )}
        {formData.jobType === 'Internship' && (
          <div className="mb-4">
            <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">
              Stipend:
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1 mt-1 mr-2 text-gray-500">&#x20B9;</span>
              <input
                type="number"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                placeholder="Enter stipend"
                className="pl-8 border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>
        )}
        {formData.jobType === 'Internship' && (
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration:
            </label>
            <select
              name="duration"
              value={formData.duration}
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
            {formData.skillsRequired.map((skill, index) => (
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
            value={formData.skillsRequired}
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
          Create Job
        </button>
      </form>
    </div>
  </div>
</div>
</div>


  );
 }else{ 

  
    return (
      <>     
       <Navbar/>
      <ContentLock/>
      </>

    );
  
}           
}

export default CreateJob;

