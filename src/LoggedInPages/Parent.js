import './PageAssets/page-styles.css'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Parent = ({ loggedInUsername }) => {
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
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
  }, [loggedInUsername]);

  return (
    <div>
      {/* HEADER */}
      <div className='hh-container'>
        <Icon icon="material-symbols:progress-activity" color="white" width="50" height="50" className='hh-icon'/>
        <h1 className='hh-greet'>PARENT</h1>
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
                <Link to='/Settings'>Edit Profile</Link>
                <Link to='/Achievements'>Your Achievements</Link>
                <Link to='/Parent'>Your Parent</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <ul>
          <li>Name: Hei</li>
        </ul>
      </div>

    </div>
  )
};

// Add PropTypes validation for loggedInUsername 
Parent.propTypes = {
  loggedInUsername: PropTypes.string.isRequired,
};

export default Parent;