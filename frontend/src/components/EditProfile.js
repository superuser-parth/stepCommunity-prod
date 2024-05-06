import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../lib/AuthContext';
import Navbar from './Navbar';

const EditProfile = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profileData, setProfileData] = useState({
    showProfile: false,
    institute: '',
    graduation: '',
    allSkills: [],
    fullName: ''
  });

  useEffect(() => {
    // Fetch available skills from the server
    fetchSkills();
    // Fetch user data and populate the selected skills
    fetchUserData();
  }, []);

  const fetchSkills = async () => {
    try {
      // Provided skills
      const skills = ['Web dev', 'Digital Marketing', 'Phone Marketing', 'Data Analytics', 'Copywriting'];
      setProfileData(prevState => ({ ...prevState, allSkills: skills }));
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`https://stepcommunity-prod.onrender.com/api/getUser`, {
        headers: {
          Authorization: token
        }
      });
      const userData = response.data;

      // Set user data into state
      setSelectedSkills(userData.skills.slice(0, 3)); // Only select up to three skills from fetched data
      setProfileData(prevState => ({
        ...prevState,
        showProfile: userData.showProfile,
        institute: userData.institute || '',
        graduation: userData.graduation || '',
        fullName: userData.fullName || ''
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSkillSelect = (event) => {
    const skill = event.target.value;

    // Check if the skill is already selected and the selectedSkills array length is less than 3
    if (!selectedSkills.includes(skill) && selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter((skill) => skill !== skillToRemove);
    setSelectedSkills(updatedSkills);
  };

  const handleToggleProfile = () => {
    setProfileData(prevState => ({
      ...prevState,
      showProfile: !prevState.showProfile
    }));
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 50; year--) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();
      const response = await axios.put(`https://stepcommunity-prod.onrender.com/api/editProfile`, {
        skills: selectedSkills,
        visible: profileData.showProfile,
        institute: profileData.institute,
        graduation: profileData.graduation,
        fullName: profileData.fullName
      }, {
        headers: {
          Authorization: token
        }
      });

      console.log('Profile updated successfully:', response.data);
      setSuccessMessage('Profile Updated Successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);

    } catch (error) {
      console.error('Error updating profile:', error.response.data.message);
      setErrorMessage('An error occurred while updating profile. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000)
    }
  };

  const { allSkills, showProfile, institute, graduation, fullName } = profileData;

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setProfileData(prevState => ({ ...prevState, fullName: e.target.value }))}
              className="border border-gray-300 rounded px-4 py-2 w-full mt-1"
              required={showProfile} // Apply 'required' attribute conditionally based on 'showProfile' state
            />
          </div>

          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
              Skills (Select up to 3):
            </label>
            <div className="mb-4">
              {selectedSkills.map((skill) => (
                <div key={skill} className=" bg-gray-200 text-black font-semibold py-1 px-2 rounded mr-2 mb-2 inline-block">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2">
                    x
                  </button>
                </div>
              ))}
            </div>
            <select
              id="skills"
              onChange={handleSkillSelect}
              value="" // Empty value to reset the dropdown after selecting a skill
              className="border border-gray-300 rounded px-4 py-2 w-full mt-1"
            >
              <option value="" disabled>Select a skill</option>
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="institute" className="block text-sm font-medium text-gray-700 mb-2">
              Institute:
            </label>
            <input
              type="text"
              id="institute"
              value={institute}
              onChange={(e) => setProfileData(prevState => ({ ...prevState, institute: e.target.value }))}
              className="border border-gray-300 rounded px-4 py-2 w-full mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="graduation" className="block text-sm font-medium text-gray-700 mb-2">
              Graduation Year:
            </label>
            <select
              id="graduation"
              value={graduation}
              onChange={(e) => setProfileData(prevState => ({ ...prevState, graduation: e.target.value }))}
              className="border border-gray-300 rounded px-4 py-2 w-full mt-1"
            >
              <option value="" disabled>Select graduation year</option>
              {generateYearOptions()}
            </select>
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input
                id="showProfile"
                type="checkbox"
                checked={showProfile}
                onChange={handleToggleProfile}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Show Profile to Potential Employers</span>
            </div>
          </div>

          <button
            type="submit"
            className=" hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none border-2 border-blue-400"
          >
            Update Profile
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

        </form>
      </div>
    </div>
  );
};

export default EditProfile;
