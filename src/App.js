import './App.css';
import { Icon } from '@iconify/react';
import CustomizedSwitch from './Assets/CustomizedSwitch';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LandingPage from './LoggedOutPages/LandingPage';
import SignInPage from './LoggedOutPages/SignInPage';
import SignUpPage from './LoggedOutPages/SignUpPage';
import Signing from './LoggedOutPages/Signing';

import Home from './LoggedInPages/Home'; 
import { Courses } from './LoggedInPages/Courses';
import Progress from './LoggedInPages/Progress';
import Settings from './LoggedInPages/Settings';
import LogOutConfirm from './LoggedInPages/LogOutConfirm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showLogOutConfirm, setShowLogOutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
    navigate('/Home');
  };
  const handleLogOutClick = () => {
    setShowLogOutConfirm(true);
  };
  const handleCancelClick = () => {
    setShowLogOutConfirm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Love+Ya+Like+A+Sister&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" />

      {isLoggedIn ? (
        <div className="logged-in">
          <nav className="nav-btns">
            <ul>
              <li><div className='navLogo'/></li>
              <li > <Link to="/Home" className="btnNav">
                <Icon icon="octicon:home-16" className='nav-icons'/>
                &nbsp;Home
              </Link></li>
              <li><Link to="/Courses" className="btnNav">
                <Icon icon="carbon:course" className='nav-icons' />
                &nbsp;Courses
              </Link></li>
              <li><Link to="/Progress" className="btnNav">
                <Icon icon="material-symbols:progress-activity" className='nav-icons' />
                &nbsp;Progress
              </Link></li>
              <li><Link to="/Settings" className="btnNav">
                <Icon icon="solar:settings-outline" className='nav-icons' />
                &nbsp;Settings
              </Link></li>
              <li>
                <div className='navParentMode'>
                  <Icon icon="ri:parent-line" color="#0745a3" width="80" height="80" className='trans-bg'/><br/>
                  Parent Mode <br/>
                  <CustomizedSwitch/>
                </div>
              </li>
              <li>
                <button onClick={handleLogOutClick} className="btnLogOut">
                  <Icon icon="tabler:logout" className='nav-icons' />
                  Log Out
                </button>
                {showLogOutConfirm && <LogOutConfirm onClose={handleCancelClick} onLogout={handleLogout} />}
              </li>
            </ul>
          </nav>
    
        <div className='main-container'>
          <Routes>
            <Route path="/Home" element={<Home loggedInUsername={userData} />} />
            <Route path="/Courses" element={<Courses/>}/>
            <Route path="/Progress" element={<Progress loggedInUsername={userData} />}/>
            <Route path="/Settings" element={<Settings loggedInUsername={userData} />}/>
            <Route path="/ConfirmLogOut" element={<LogOutConfirm onClose={handleCancelClick} onLogout={handleLogout} />} />
          </Routes>
          <div id="portal-root"></div>
        </div>
      </div>
      ) : (
        <div className="loggedout-container">
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/Signing" element={<Signing />} />
            <Route path="/SignInPage" element={<SignInPage onLogin={handleLogin}/>}/>
            <Route path="/SignUpPage" element={<SignUpPage/>}/>
          </Routes>
        </div>
      )}
    </div>
  );
}

// Add PropTypes for userData
Home.propTypes = {
  userData: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fname: PropTypes.string.isRequired,
        lname: PropTypes.string.isRequired,
        // Add other properties as needed
      })
    ),
    PropTypes.oneOf([null]), // Allow null for initial state
  ]),
};


export default App;