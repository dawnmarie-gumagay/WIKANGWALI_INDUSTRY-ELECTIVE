import './PageAssets/page-styles.css'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Courses(){
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/user/getAllUsers');
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      {/* HEADER */}
      <div className='hh-container'>
        <Icon icon="carbon:course" color="white" width="50" height="50" className='hh-icon'/>
        <h1 className='hh-greet'>KURSO</h1>
        <div className='hh-container2'>
          <Icon icon='ion:notifications' width='30px' height='30px' className='hh-icon' />
          <Icon icon='noto:diamond-with-a-dot' width='30px' height='30px' className='hh-icon' />
          {userData && userData.length > 0 && (
            userData.map((user) => (
              <div key={user.id}>
                <p style={{ marginLeft: '15px' }}>{user.fname} {user.lname}</p>
              </div>
            ))
          )}
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
    </div>
  )
}