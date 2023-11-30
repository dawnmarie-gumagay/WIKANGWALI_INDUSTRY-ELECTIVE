import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PageAssets/page-styles.css';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

const Home = ({ loggedInUsername }) => {
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
            console.log('Fetched userData:', data); // Log the fetched data
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

        {/* 1.HOME - LESSON */}
        <div className='home-lesson'>
          YOUR CURRENT LESSON
          
          <Link to="/courses" className='hi'>
            <Icon icon="icon-park-outline:next" className='hi-back'/>
          </Link>
          <br/>
          <div>
            <div className='hp-course'>
            Kurso 1: <br/>Pambungad sa Wikang Filipino
            </div>
            <div className='hp-lesson'>
            Aralin 1: <br/>Pagbati at Karaniwang Pananalita<br/>
            <br/>
            <Link to="/lessons" className='hb'>CONTINUE</Link>
            </div>
          </div>
        </div>
        
        {/* 2.HOME - PROGRESS */}
        <div className='home-progress'>
          RECENT PROGRESS
          <Link to="/Courses" className='hi'>
            <Icon icon="icon-park-outline:next" className='hi-back'/>
          </Link>
          <br/>
          Aralin 1
          {/* INSERT PROGRESS BAR */}
          <hr/>
          YOUR ACHIEVEMENTS
          <Link to="/Achievements" className='hi'>
            <Icon icon="icon-park-outline:next" className='hi-back'/>
          </Link>
        </div>

      </div>

      </div>
  );
};

// Add PropTypes validation for loggedInUsername
Home.propTypes = {
  loggedInUsername: PropTypes.string.isRequired,
};

export default Home;