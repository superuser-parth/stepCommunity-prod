  import { removeToken } from '../lib/AuthContext';
  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';

  const Navbar = () => {
    const [dropdownsOpen, setDropdownsOpen] = useState({}); // State for dropdown open status
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu open status
    const[showConfirmLogout, setShowConfirmLogout] = useState(false); //State for confirm logout status

    // Logout function
    const handleLogout = () => {
      removeToken();
      window.location.href = '/login';
    };

    // Toggle mobile menu
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const handleConfirmLogout=()=>{
      handleLogout();
      setShowConfirmLogout(false);
    }

    // Function to toggle dropdown
    const handleDropdownToggle = (dropdownId) => {
      setDropdownsOpen((prevDropdownsOpen) => {
        const updatedDropdowns = { ...prevDropdownsOpen };
        Object.keys(updatedDropdowns).forEach((key) => {
          if (key !== dropdownId) {
            updatedDropdowns[key] = false; // Close other dropdowns
          }
        });
        updatedDropdowns[dropdownId] = !prevDropdownsOpen[dropdownId]; // Toggle the clicked dropdown
        return updatedDropdowns;
      });
    };

    // Function to handle clicks outside dropdown
    const handleClickOutside = (event) => {
      const isDropdown = event.target.closest('.relative');
      if (!isDropdown) {
        setDropdownsOpen({});
      }
    };

    // Add event listener on component mount and remove on unmount
    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
      <nav className=" bg-gray-200 p-4 flex justify-between items-center h-20 border-b border-black">
        <div className="flex items-center space-x-4 ml-10">
          <Link to="/dashboard" className="text-black hover:text-gray-600t text-xl font-bold">
            stepCommunity.
          </Link>
        </div>

      {/* Mobile Menu Toggle */}
      <div className="block lg:hidden">
        <button onClick={toggleMenu} className="text-black hover:text-gray-600 focus:outline-none">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>



        {/* Desktop Menu */}
        <ul className={`hidden lg:flex items-center space-x-4 mr-24 ${isMenuOpen ? 'hidden' : 'block'}`}>
          <li>
           {/* First dropdown starts here */}
            <div className="relative">
              <button onClick={() => handleDropdownToggle('dropdown1')} className="text-black hover:text-gray-600 flex justify-end ml-4">
                Business
                <span className="ml-1 mt-2 mr-4">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.293l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414-1.414L10 12.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              <ul className={`z-10 absolute w-32 bg-gray-200 mt-1 py-1 rounded-md shadow-lg transition-opacity duration-200 ease-in-out ${dropdownsOpen['dropdown1'] ? 'opacity-100 visible' : 'opacity-0 invisible'} mt-6`}>
                <li>
                  <Link to="/marketplace" className="block px-4 py-2 text-sm text-black hover:bg-gray-400">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/affiliate" className="block px-4 py-2 text-sm text-black hover:bg-gray-400">
                    Affiliate Resources
                  </Link>
                </li>
              </ul>
            </div>

          </li>

          {/* Second dropdown starts here */}
          <li>
            <div className="relative">
              <button onClick={() => handleDropdownToggle('dropdown2')} className="text-black hover:text-gray-600 flex justify-end ml-3">
                Explore
                <span className="ml-1 mt-2 mr-4">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.293l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414-1.414L10 12.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              <ul className={`z-10 absolute w-32 bg-gray-200 mt-1 py-1 rounded-md shadow-lg transition-all duration-800 ease-in-out overflow-hidden ${dropdownsOpen['dropdown2'] ? 'opacity-100 visible' : 'opacity-0 invisible'} mt-6`}>
                <li>
                  <Link to="/explore" className="flex justify-center px-4 py-2 text-sm text-black hover:bg-gray-400">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/applicants" className="flex justify-center px-4 py-2 text-sm text-black hover:bg-gray-400">
                    Applicants
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Third dropdown starts here */}
          <li>
            <div className="relative">
              <button onClick={() => handleDropdownToggle('dropdown3')} className="text-black hover:text-gray-600 flex justify-end ml-3">
                Profile
                <span className="ml-1 mt-2 mr-4">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.293l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414-1.414L10 12.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              <ul className={`z-10 absolute w-32 bg-gray-200 mt-1 py-1 rounded-md shadow-lg transition-all duration-200 ease-in-out overflow-hidden ${dropdownsOpen['dropdown3'] ? 'opacity-100 visible' : 'opacity-0 invisible'} mt-6`}>
                <li>
                  <Link to="/myprofile" className="flex justify-center px-4 py-2 text-sm text-black hover:bg-gray-400">
                    My Profile
                  </Link>
                </li>
                <li>
                  <button className="flex w-full justify-center px-4 py-2 text-sm text-black hover:bg-gray-400 border-t border-black mt-4" onClick={()=>setShowConfirmLogout(true)}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </li>
          {showConfirmLogout && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-4 rounded-lg text-black z-20">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-center mt-4">
              <button className="bg-red-500 text-white px-4 py-2 mr-4 rounded-lg" onClick={handleConfirmLogout}>Yes</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowConfirmLogout(false)}>No</button>
            </div>
          </div>
        </div>
      )}

    
        </ul>
       
        {/* Mobile Menu */}
        {isMenuOpen && (
    <div className="lg:hidden absolute top-0 left-0 h-full w-full bg-gray-200 z-50">
      <button onClick={toggleMenu} className="absolute top-4 right-4 text-black hover:text-gray-600 focus:outline-none">
        {/* You can replace the icon with a close icon */}
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <ul className="flex flex-col items-center justify-center h-full space-y-4">
        <li>
          <Link to="/dashboard" className="text-black hover:text-gray-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/marketplace" className="text-black hover:text-gray-600">
            Marketplace
          </Link>
        </li>
        <li>
          <Link to="/affiliate" className="text-black hover:text-gray-600">
            Affiliate Resources
          </Link>
        </li>
        <li>
          <Link to="/explore" className="text-black hover:text-gray-600">
            Jobs
          </Link>
        </li>
        <li>
          <Link to="/applicants" className="text-black hover:text-gray-600">
            Applicants
          </Link>
        </li>
        <li>
          <Link to="/myprofile" className="text-black hover:text-gray-600">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-black hover:text-gray-600" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  )}
      </nav>
    );
  };

  export default Navbar;