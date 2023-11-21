// App.js
import React, { useState } from 'react';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import './App.css';
import LandingPage from './LoggedOutPages/LandingPage';
import SignInPage from './LoggedOutPages/SignInPage';
import SignUpPage from './LoggedOutPages/SignUpPage';
import Signing from './LoggedOutPages/Signing';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Love+Ya+Like+A+Sister&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" />
      </head>

      {isLoggedIn ? (
        <LoggedIn />
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

export default App;
