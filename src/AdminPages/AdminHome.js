import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PageAssets/page-styles.css';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

const AdminHome = ({ loggedInUsername }) => {
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the data for the logged-in user based on their username
        const response = await fetch(`http://localhost:8080/student/getStudentByUsername/${loggedInUsername}`);
        const data = await response.json();
        setUserData(data);

        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [loggedInUsername]);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  

  return (
    <div>
      {/* HEADER */}
      <div className='hh-container'>
        <div className='pfp-icon' />
        {userData?.fname && (
          <h1 className='hh-greet'>HI {userData.fname}!</h1>
        )}
        <div className='hh-container2'>
          <Icon icon='ion:notifications' width='30px' height='30px' className='hh-icon' />
          <Icon icon='noto:diamond-with-a-dot' width='30px' height='30px' className='hh-icon' />
          <p style={{ marginLeft: '15px' }}>{userData?.fname} {userData?.lname}</p>
          <div className='dropdown-container'>
            <Icon
              icon='ic:round-arrow-drop-down'
              width='30px'
              height='30px'
              className='hh-icon'
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className='dropdown-content'>
                {/* Your React Router Links go here */}
                <Link to='/option1'>Your Profile</Link>
                <Link to='/option2'>Your Achievements</Link>
                <Link to='/option3'>Your Mom</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className='home-contents'>

        

      </div>

      </div>
  );
};

// Add PropTypes validation for loggedInUsername
AdminHome.propTypes = {
  loggedInUsername: PropTypes.string.isRequired,
};

export default AdminHome;