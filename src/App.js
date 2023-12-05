import './App.css';
import { Icon } from '@iconify/react';
import CustomizedSwitch from './Assets/CustomizedSwitch';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import LandingPage from './LoggedOutPages/LandingPage';
import SignInPage from './LoggedOutPages/SignInPage';
import SignUpPage from './LoggedOutPages/SignUpPage';
import Signing from './LoggedOutPages/Signing';

import Home from './LoggedInPages/Home'; 
import Courses from './LoggedInPages/Courses';
import Progress from './LoggedInPages/Progress';
import Settings from './LoggedInPages/Settings';
import LogOutConfirm from './LoggedInPages/LogOutConfirm';

import Achievements from './LoggedInPages/Achievements';

import AdminHome from './AdminPages/AdminHome';
import { AdminStudents } from './AdminPages/AdminStudents';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showLogOutConfirm, setShowLogOutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
  
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setIsLoggedIn(true);
        setUserData(parsedUserData);
        setIsAdmin(parsedUserData.isAdmin); // Assuming isAdmin is stored in the userData
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Handle the error (e.g., remove the invalid data from localStorage)
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
  
    // Log the entire userData object
    console.log('userData:', userData);
    
    // Check the isAdmin field directly
    const isAdminUser = userData=='admin';
    setIsAdmin(isAdminUser);
  
    // Log the isAdmin state
    console.log('isAdmin:', isAdminUser);
  
    // Store the login state in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isAdmin', JSON.stringify(isAdminUser)); // Store isAdmin in localStorage

    console.log('Render userData:', userData); // Log userData on render
  
    // Redirect the user based on their role
    if (isAdminUser) {
      setIsAdmin(true);
      navigate('/AdminHome');
    } else {
      navigate('/Home');
    }
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

    // Remove stored login state from localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('isAdmin'); // Remove isAdmin from localStorage

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
              {isAdmin ? (
                // Render admin-specific navigation items
                <>
                  <li>
                      <div className='navLogoAdmin'/>
                  </li>
                  <li><Link to="/AdminHome" className="btnNav">
                    <Icon icon="carbon:user-role" className='nav-icons' />
                    &nbsp;Home
                  </Link></li>
                  <li><Link to="/AdminStudents" className="btnNav">
                    <Icon icon="carbon:user-role" className='nav-icons' />
                    &nbsp;Students
                  </Link></li>
                  <li><Link to="/AdminCourses" className="btnNav">
                    <Icon icon="carbon:user-role" className='nav-icons' />
                    &nbsp;Courses
                  </Link></li>
                  <li><Link to="/AdminAchievements" className="btnNav">
                    <Icon icon="carbon:user-role" className='nav-icons' />
                    &nbsp;Achievements
                  </Link></li>
                  <li><Link to="/AdminArchives" className="btnNav">
                    <Icon icon="carbon:user-role" className='nav-icons' />
                    &nbsp;ARCHIVES
                  </Link></li>
                </>
              ) : (
                // Render regular user navigation items
                <>
                  <li>
                      <div className='navLogo'/>
                  </li>
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
                </>
              )}
              <li>
                <button onClick={handleLogOutClick} className="btnLogOut">
                  <Icon icon="tabler:logout" className='nav-icons' />
                  Log Out
                </button>
                {showLogOutConfirm && <LogOutConfirm onClose={handleCancelClick} onLogout={handleLogout} />}
              </li>
            </ul>
          </nav>

          {/*WHITE EMPTY CONTAINER*/}
          <div className='main-container'>
            <Routes>
              {isAdmin ? (
                // Render admin-specific routes
                <>
                  <Route path="/AdminHome" element={<AdminHome loggedInUsername={userData}/>}/>
                  <Route path="/AdminStudents" element={<AdminStudents loggedInUsername={userData}/>}/>
                </>
              ) : (
                // Render regular user routes
                <>
                  <Route path="/Home" element={<Home loggedInUsername={userData} />} />
                  <Route path="/Courses" element={<Courses loggedInUsername={userData}/>}/>
                  <Route path="/Progress" element={<Progress loggedInUsername={userData} />}/>
                  <Route path="/Settings" element={<Settings loggedInUsername={userData} />}/>

                  <Route path="/Achievements" element={<Achievements loggedInUsername={userData} />}/>
                </>
              )}
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