import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PageAssets/page-styles.css';
import { Icon } from '@iconify/react';

export function Home(){
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

  return(
    <div>
      {/* HEADER */}
      <div className='hh-container'>
        <div className='pfp-icon' />
        {userData && userData.length > 0 && (
          <h1 className='hh-greet'>HI {userData[0].fname}!</h1>
        )}
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
  )
}