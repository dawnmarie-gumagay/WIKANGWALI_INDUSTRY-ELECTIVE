import './PageAssets/page-styles.css';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Progress = ({ loggedInUsername }) => {
  const [userData, setUserData] = useState(null);
  const [progressTrackers, setProgressTrackers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredTrackers, setFilteredTrackers] = useState([]);
  const [toggle, setToggle] = useState('ALL');


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/student/getStudentByUsername/${loggedInUsername}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchProgressTrackers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/student/${loggedInUsername}/ViewStudentProgressT`);
        const data = await response.json();
        setProgressTrackers(data);
        setFilteredTrackers(data);
      } catch (error) {
        console.error('Error fetching progress trackers:', error);
      }
    };

    fetchUserData();
    fetchProgressTrackers();
  }, [loggedInUsername]);

  useEffect(() => {
    // Update the filtered trackers based on the selected toggle
    if (toggle === 'ALL') {
      setFilteredTrackers(progressTrackers);
    } else if (toggle === 'IN PROGRESS') {
      setFilteredTrackers(progressTrackers.filter(tracker => !tracker.completed));
    } else if (toggle === 'COMPLETED') {
      setFilteredTrackers(progressTrackers.filter(tracker => tracker.completed));
    }
  }, [toggle, progressTrackers]);

  return (
    <div>
      {/* HEADER */}
      <div className='hh-container'>
        <Icon icon="material-symbols:progress-activity" color="white" width="50" height="50" className='hh-icon'/>
        <h1 className='hh-greet'>PROGRESS</h1>
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
                <Link to='/Settings'>Edit Profile</Link>
                <Link to='/Achievements'>Your Achievements</Link>
                <Link to='/Parent'>Your Parent</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <br/>
      
      <div>
        {/* DISPLAY PROGRESS TRACKERS */}

        {/* TOGGLE BUTTONS */}
        <button className='btnAll' onClick={() => setToggle('ALL')}>ALL</button>
        <button className='btnInc'onClick={() => setToggle('IN PROGRESS')}>IN PROGRESS</button>
        <button className='btnC'onClick={() => setToggle('COMPLETED')}>COMPLETED</button>

        {/* DISPLAY PROGRESS TRACKERS */}
        <div className='progress-container'>
          {filteredTrackers && filteredTrackers.length > 0 ? (
            filteredTrackers.map((tracker) => (
              <div className='progress-card' key={tracker.progressTrackerId}>
                <strong>{tracker.actName}</strong>
                <div className={`progress-bar ${tracker.completed ? 'completed' : 'incomplete'}`} style={{ width: `${tracker.progPerc}%` }}></div>
                <p style={{ color: tracker.completed ? 'green' : 'red' }}>
                  {tracker.completed ? 'Completed' : 'Incomplete'}
                </p>
                {/* Add more details or styles as needed */}
              </div>
            ))
          ) : (
            <p>You have not yet started any progress</p>
          )}
        </div>

      </div>
      
    </div>
  );
};

// Add PropTypes validation for loggedInUsername
Progress.propTypes = {
  loggedInUsername: PropTypes.string.isRequired,
};

export default Progress;
