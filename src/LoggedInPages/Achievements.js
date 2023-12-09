import './PageAssets/page-styles.css';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Achievements = ({ loggedInUsername }) => {
  const [userData, setUserData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`http://localhost:8080/student/getStudentByUsername/${loggedInUsername}`);
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch achievements data
        const achievementsResponse = await fetch(`http://localhost:8080/student/${loggedInUsername}/ViewStudentAchievements`);
        const achievementsData = await achievementsResponse.json();
        setAchievements(achievementsData);

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
        <Icon icon="mdi:achievement-outline" color="white" width="50" height="50" className='hh-icon'/>
        <h1 className='hh-greet'>YOUR ACHIEVEMENTS</h1>
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
                <Link to='/Parent'>Your Parent</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className='achieve-bod'>
        {/* YOUR POINTS */}
        <div className='pt-container2'>
          <div className='stars2'>
            <h3>Stars</h3>
            <div className='stars-icon2'/>
              {userData?.ptStar ? (
                <h4>{userData.ptStar}</h4>
              ) : (
                <h4>0</h4>
              )}
            </div>

          <div className='dias2'>
            <h3>Diamonds</h3>
            <div className='dias-icon2'/>
            {userData?.ptDia ? (
              <h4>{userData.ptDia}</h4>
            ) : (
              <h4>0</h4>
            )}
          </div>
        </div>
        <hr className='hra'/>
        {/* Display Achievements */}
        <div className='disp-achieve'>
          {achievements && achievements.length > 0 ? (
            <ul className='indiv-achieve'>
              {achievements.map((achievement) => (
                <li key={achievement.achievement_id}>
                  <strong>{achievement.achievement_name}</strong>
                  <br/>
                  <p>{achievement.achievement_desc}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have not yet earned any achievements</p>
          )}
        </div>
      </div>
      
  </div>
  );
};

// Add PropTypes validation for loggedInUsername
Achievements.propTypes = {
  loggedInUsername: PropTypes.string.isRequired,
};

export default Achievements;
