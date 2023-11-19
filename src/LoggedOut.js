import './App.css';
import LandingPage from './LoggedOutPages/LandingPage';
import SignInPage from './LoggedOutPages/SignInPage';
import SignUpPage from './LoggedOutPages/SignUpPage';
import Signing from './LoggedOutPages/Signing';
import { Route, Routes, Link } from 'react-router-dom';

export default function LoggedOut() {
  return (
    <div className="loggedout-container">
      <Routes>
        <Route path="/LandingPage" element={<LandingPage/>}/>
        <Route path="/Signing" element={<Signing/>}/>
        <Route path="/SignInPage" element={<SignInPage/>}/>
        <Route path="/SignUpPage" element={<SignUpPage/>}/>
      </Routes>
    </div>
  );
}
