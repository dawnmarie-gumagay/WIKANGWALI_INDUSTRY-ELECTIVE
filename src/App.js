import './App.css';
import { Icon } from '@iconify/react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@mui/material';

import LandingPage from './LoggedOutPages/LandingPage';
import SignInPage from './LoggedOutPages/SignInPage';
import SignUpPage from './LoggedOutPages/SignUpPage';
import Signing from './LoggedOutPages/Signing';
import AboutUsPage from './LoggedOutPages/AboutUsPage';
import ContactUsPage from './LoggedOutPages/ContactUsPage';
import ResetPassword from './LoggedOutPages/ResetPassword';
import ResetPassword2 from './LoggedOutPages/ResetPassword2';
import ResetPasswordSuccess from './LoggedOutPages/ResetPasswordSuccess';

import Home from './LoggedInPages/Home'; 
import Courses from './LoggedInPages/Courses';
import Progress from './LoggedInPages/Progress';
import Settings from './LoggedInPages/Settings';
import LogOutConfirm from './LoggedInPages/LogOutConfirm';
import Achievements from './LoggedInPages/Achievements';
import Parent from './LoggedInPages/Parent';

import AdminHome from './AdminPages/AdminHome';
import { AdminStudents } from './AdminPages/AdminStudents';
import { AdminAchievements } from './AdminPages/AdminAchievements';

import ParentModeConfirm from './ParentModeConfirm';
import StudentModeConfirm from './StudentModeConfirm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showLogOutConfirm, setShowLogOutConfirm] = useState(false);
  
  const [showParentModeConfirm, setShowParentModeConfirm] = useState(false);
  const [isParentMode, setIsParentMode] = useState(false);
  const [prevParentMode, setPrevParentMode] = useState(false); // To store the previous state
  const [showStudentModeConfirm, setShowStudentModeConfirm] = useState(false);

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

  //FOR LOGGING IN
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
  

  //FOR LOGOUT POP UP
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


  //FOR PARENT MODE SWITCHING
  const handleSwitchChange = (event) => {
    const newMode = event.target.checked;
    setIsParentMode(newMode);
  
    // Show the confirmation pop-up when switching to parent mode
    if (newMode) {
      setShowParentModeConfirm(true);
    } else {
      // If switching back to student mode, show the confirmation pop-up
      setShowStudentModeConfirm(true);
      setIsParentMode(false);
    }
  };  
  const handleParentModeConfirmClose = () => {
    // Close the confirmation pop-up
    setShowParentModeConfirm(false);

    // If the user cancels, revert the switch state to the previous state
    if (!isParentMode) {
      setIsParentMode(prevParentMode);
    }
  };
  const handleParentModeSwitchConfirmed = () => {
    // Perform any additional actions needed for the switch
    // ...

    // Store the current state as the previous state
    setPrevParentMode(isParentMode);

    // Close the confirmation pop-up
    setShowParentModeConfirm(false);
  };

  //FOR SWITCHING BACK
  // Add logic for handling student mode confirmation
  const handleStudentModeConfirmClose = () => {
    setShowStudentModeConfirm(false);
  };

  const handleStudentModeSwitchConfirmed = () => {
    // Perform any additional actions needed for switching back to student mode
    // ...
  
    // Set the state to switch back to student mode
    setIsParentMode(false);
  
    // Close the confirmation pop-up
    setShowStudentModeConfirm(false);
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
                // Render regular user or parent-specific navigation items
                <>
                  {/* Regular user links - Conditionally rendered based on isParentMode */}
                  {!isParentMode && (
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
                </>
              )}
              {/* Parent-specific links when in parent mode */}
              {isParentMode && (
                <>
                  <li>
                      <div className='navLogoParent'/>
                  </li>
                  <li><Link to="/ParentHome" className="btnNav">
                    <Icon icon="octicon:home-16" className='nav-icons'/>
                    &nbsp;Home
                  </Link></li>
                  <li><Link to="/ParentCourses" className="btnNav">
                    <Icon icon="carbon:course" className='nav-icons' />
                    &nbsp;Courses
                  </Link></li>
                  <li><Link to="/ParentProgress" className="btnNav">
                    <Icon icon="material-symbols:progress-activity" className='nav-icons' />
                    &nbsp;Progress
                  </Link></li>
                  <li><Link to="/ParentSettings" className="btnNav">
                    <Icon icon="solar:settings-outline" className='nav-icons' />
                    &nbsp;Settings
                  </Link></li>
                </>
              )}
              {/* Parent mode switch */}
              <li>
                <div className='navParentMode'>
                  <Icon icon="ri:parent-line" color="#0745a3" width="80" height="80" className='trans-bg'/><br/>
                  Parent Mode <br/>
                  <Switch
                    onChange={handleSwitchChange}
                    checked={isParentMode}
                    color="primary"
                    inputProps={{ 'aria-label': 'parent-mode-switch' }}
                  />
                </div>
              </li>
            </>
          )}
          {/* Log out button */}
          <li>
                <button onClick={handleLogOutClick} className="btnLogOut">
                  <Icon icon="tabler:logout" className='nav-icons' />
                  Log Out
                </button>
                
              </li>
            </ul>
          </nav>

          {/* WHITE EMPTY CONTAINER */}
          <div className='main-container'>
            <Routes>
              {isAdmin ? (
                // Render admin-specific routes
                <>
                  <Route path="/AdminHome" element={<AdminHome loggedInUsername={userData} />} />
                  <Route path="/AdminStudents" element={<AdminStudents loggedInUsername={userData} />} />
                  <Route path="/AdminAchievements" element={<AdminAchievements loggedInUsername={userData} />} />
                </>
              ) : (
                // Render regular user or parent-specific routes
                <>
                  {/* Regular user routes - Conditionally rendered based on isParentMode */}
                  {!isParentMode && (
                    <>
                      <Route path="/Home" element={<Home loggedInUsername={userData} />} />
                      <Route path="/Courses" element={<Courses loggedInUsername={userData} />} />
                      <Route path="/Progress" element={<Progress loggedInUsername={userData} />} />
                      <Route path="/Settings" element={<Settings loggedInUsername={userData} />} />

                      <Route path="/Achievements" element={<Achievements loggedInUsername={userData} />} />
                      <Route path="/Parent" element={<Parent loggedInUsername={userData} />} />
                    </>
                  )}
                  {/* Parent-specific routes when in parent mode */}
                  {isParentMode && (
                    <>
                      <Route path="/ParentHome"  />
                      <Route path="/ParentCourses"   />
                      <Route path="/ParentProgress"  />
                      <Route path="/ParentSettings" />
                    </>
                  )}
                  {/* Parent mode switch */}
                  <Route path="/ParentModeSwitch" />
                </>
              )}
              <Route path="/ConfirmLogOut" element={<LogOutConfirm onClose={handleCancelClick} onLogout={handleLogout} />} />
            </Routes>
          </div>
          {showLogOutConfirm && <LogOutConfirm onClose={handleCancelClick} onLogout={handleLogout} />}
        </div>

      ) : (
        <div className="loggedout-container">
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/Signing" element={<Signing />} />
            <Route path="/SignInPage" element={<SignInPage onLogin={handleLogin}/>}/>
            <Route path="/SignUpPage" element={<SignUpPage/>}/>
            <Route path="/AboutUsPage" element={<AboutUsPage/>}/>
            <Route path="/ContactUsPage" element={<ContactUsPage/>}/>
          
            <Route path="/ResetPassword" element={<ResetPassword/>}/>
            <Route path="/ResetPassword2" element={<ResetPassword2/>}/>
            <Route path="/ResetPasswordSuccess" element={<ResetPasswordSuccess/>}/>
          </Routes>
        </div>
      )}

      {/* Confirmation pop-up */}
      {showParentModeConfirm && (
        <ParentModeConfirm onClose={handleParentModeConfirmClose} onSwitch={handleParentModeSwitchConfirmed} />
      )}
      {showStudentModeConfirm && (
        <StudentModeConfirm onClose={handleStudentModeConfirmClose} onSwitch={handleStudentModeSwitchConfirmed} />
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