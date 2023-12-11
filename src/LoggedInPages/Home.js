import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PageAssets/page-styles.css';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

const Home = ({ loggedInUsername }) => {
  const [userData, setUserData] = useState(null);
  const [progressTrackers, setProgressTrackers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getLastIncompleteTracker = () => {
    for (let i = progressTrackers.length - 1; i >= 0; i--) {
      if (!progressTrackers[i].completed) {
        return progressTrackers[i];
      }
    }
    // Return the last tracker if all are completed
    return progressTrackers[progressTrackers.length - 1];
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

    const fetchProgressTrackers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/student/${loggedInUsername}/ViewStudentProgressT`);
        const data = await response.json();
        setProgressTrackers(data);
      } catch (error) {
        console.error('Error fetching progress trackers:', error);
      }
    };

    fetchUserData();
    fetchProgressTrackers();
  }, [loggedInUsername]);

  return (
    <div>
      {/* HEADER */}
      <div className='hh-container'>
        <div className='pfp-icon' />
        <Icon icon="lucide:user" color="white" width="50" height="50" className='hh-icon'/>
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
                <Link to='/Settings'>Edit Profile</Link>
                <Link to='/Achievements'>Your Achievements</Link>
                <Link to='/Parent'>Your Parent</Link>
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
          <Link to="/Progress" className='hi'>
            <Icon icon="icon-park-outline:next" className='hi-back'/>
          </Link>
          <br/>

          {/* DISPLAY RECENT PROGRESS */}
          <div className='progress-container'>
            {progressTrackers && progressTrackers.length > 0 ? (
              // Get the last incomplete progress tracker or the one before it
              <div className='progress-card2' key={getLastIncompleteTracker().progressTrackerId}>
                <strong>{getLastIncompleteTracker().actName}</strong>
                <div className={`progress-bar ${getLastIncompleteTracker().completed ? 'completed' : 'incomplete'}`} style={{ width: `${getLastIncompleteTracker().progPerc}%` }}></div>
                {/* Add more details or styles as needed */}
              </div>
            ) : (
              <p>You have not yet started any progress</p>
            )}
          </div>


          <hr/>
          YOUR ACHIEVEMENTS
          <Link to="/Achievements" className='hi'>
            <Icon icon="icon-park-outline:next" className='hi-back'/>
          </Link>

          {/* YOUR POINTS */}
          <div className='pt-container'>
            <div className='stars'>
              <h3>Stars</h3>
              <div className='stars-icon'/>
              {userData?.ptStar ? (
                <h4>{userData.ptStar}</h4>
              ) : (
                <p>0</p>
              )}
            </div>

            <div className='dias'>
              <h3>Diamonds</h3>
              <div className='dias-icon'/>
              {userData?.ptDia ? (
                <h4>{userData.ptDia}</h4>
              ) : (
                <p>0</p>
              )}
            </div>
          </div>

          
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