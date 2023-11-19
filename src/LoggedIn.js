import './App.css';
import React from 'react';
import { Icon } from '@iconify/react';
import CustomizedSwitch from './Assets/CustomizedSwitch';
import { Route, Routes, Link } from 'react-router-dom';
import { Home } from './LoggedInPages/Home';
import { Courses } from './LoggedInPages/Courses';
import { Progress } from './LoggedInPages/Progress';
import { Settings } from './LoggedInPages/Settings';
import { LogOutConfirm } from './LoggedInPages/LogOutConfirm';

export default function LoggedIn() {
  return (
    <div className="logged-in">
      <nav className="nav-btns">
       <ul>
        <li><div className='navLogo'/></li>
        <li > <Link to="/Home" className="btnNav">
          <Icon icon="octicon:home-16" className='nav-icons'/>
          &nbsp;Home
        </Link></li>
        <li><Link to="/courses" className="btnNav">
          <Icon icon="carbon:course" className='nav-icons' />
          &nbsp;Courses
        </Link></li>
        <li><Link to="/progress" className="btnNav">
          <Icon icon="material-symbols:progress-activity" className='nav-icons' />
          &nbsp;Progress
        </Link></li>
        <li><Link to="/settings" className="btnNav">
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
        <li><Link to="/ConfirmLogOut" className="btnLogOut">
          <Icon icon="tabler:logout" className='nav-icons' />
          &nbsp;Log Out
        </Link></li>
      </ul>
    </nav>

      <div className='main-container'>
        {/*ROUTING*/}
        <Routes>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/progress" element={<Progress/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/ConfirmLogOut" element={<LogOutConfirm/>}/>
      </Routes>
      </div>
      
    </div>
  );
}
