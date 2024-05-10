import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { decodeToken, getToken } from '../lib/AuthContext';
import ContentLock from './ContentLock';
import { Link } from 'react-router-dom';

const Applicant = () => {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const token=getToken()
  const decodedToken=decodeToken(token)

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = getToken();
      const decodedToken = decodeToken(token);

      if (decodedToken.userType === 'paid') {
        const response = await axios.get('https://stepcommunity-prod.onrender.com/api/getApplicants', {
          headers: {
            Authorization: token
          }
        });
        setApplicants(response.data);
        setFilteredApplicants(response.data);
        
      } else {
        // Handle error or notify user about unauthorized access
      }
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };


  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase(); // Convert search term to lowercase
    setSearchTerm(searchTerm);
  
    // Filter applicants based on search term
    const filtered = applicants.filter(applicant =>
      applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
      applicant.institute.toLowerCase().includes(searchTerm) ||
      applicant.graduation.toString().includes(searchTerm)
    );
    setFilteredApplicants(filtered);
  };
  
if(decodedToken.userType==='paid')
 { return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Explore Applicants</h2>
        <input
          type="text"
          placeholder="Search by skills, institute, or graduation year"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
        />
        <div>
          {filteredApplicants.map(applicant => (
            <div key={applicant.id} className="border rounded-md px-4 py-2 mb-2">
              <h3 className="text-lg font-semibold">{applicant.fullName}</h3>
              <p className="text-sm text-gray-600">Skills: {applicant.skills.join(', ')}</p>
              <p className="text-sm text-gray-600">Institute: {applicant.institute}</p>
              <p className="text-sm text-gray-600">Graduation Year: {applicant.graduation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );}else{
    return(
        <div>
            <Navbar/>
            <ContentLock/>
        </div>
    );
  }
};

export default Applicant;
