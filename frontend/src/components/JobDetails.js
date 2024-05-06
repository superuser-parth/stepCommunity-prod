import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { getToken } from '../lib/AuthContext';
import Navbar from './Navbar';

const JobDetails = () => {
  const [job, setJob] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchJobDetails = async () => {
      const token = getToken()
      try {
        const response = await axios.get(`http://localhost:4444/api/job-details/${id}`, {
          headers: {
            Authorization: token
          }
        });
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <Navbar className="w-full max-w-screen-xl mx-auto" />
  
      <div className="flex justify-center">
        <div className="w-full md:w-10/12">
          <div className="mb-8 mt-8 flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="border border-gray-300 rounded-md p-4">
                <h2 className="text-xl font-bold mb-4">Title: <br/>{job.title}</h2>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="border border-gray-300 rounded-md p-4">
                <h2 className="text-xl font-bold mb-4">Location: <br/>{job.location}</h2>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="border border-gray-300 rounded-md p-4">
                <h2 className="text-xl font-bold mb-4">Contact: <br/>{job.contactInformation}</h2>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="border border-gray-300 rounded-md p-4">
                <h2 className="text-xl font-bold mb-4">Job Type: <br/>{job.jobType}</h2>
              </div>
            </div>
  
            {job.jobType === 'Full-Time' &&
              <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
                <div className="border border-gray-300 rounded-md p-4">
                  <h2 className="text-xl font-bold mb-4">Salary: <br/>{job.salary} LPA</h2>
                </div>
              </div>
            }
  
            {job.jobType === 'Internship' &&
              <>
                <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
                  <div className="border border-gray-300 rounded-md p-4">
                    <h2 className="text-xl font-bold mb-4">Stipend:<br/>₹ {job.stipend}</h2>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
                  <div className="border border-gray-300 rounded-md p-4">
                    <h2 className="text-xl font-bold mb-4">Duration: <br/>{job.duration} months</h2>
                  </div>
                </div>
              </>
            }
          </div>
  
          <div className="md:flex mb-8">
            <div className="w-full md:w-1/2 lg:w-3/4 px-2 mb-4">
              <div className="border border-gray-300 rounded-md p-4">
                <h2 className="text-2xl font-bold mb-4">Description:</h2>
                <p>{job.description}</p>
              </div>
              <div className="border border-gray-300 rounded-md p-4 mt-4">
                <h2 className="text-2xl font-bold mb-4">About:</h2>
                <p>{job.about}</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
              <div className="border border-gray-300 rounded-md p-4">
                <h2 className="text-2xl font-bold mb-4">Skills Required:</h2>
                <ul>
                  {job.skillsRequired.map((skill, index) => (
                    <li key={index} className="mb-2">{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
  

};  

export default JobDetails;
