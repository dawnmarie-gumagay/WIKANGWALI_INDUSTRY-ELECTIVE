import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PageAssets/page-styles.css';
import { Icon } from '@iconify/react';

export function Home(){

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return(
    <div>
      {/* HEADER */}
      <div className='hh-container'>
        <div className='pfp-icon' />
        
        <h1 className='hh-greet'>HI GELU!</h1>
        <div className='hh-container2'>
          <Icon icon='ion:notifications' width='30px' height='30px' className='hh-icon' />
          <Icon icon='noto:diamond-with-a-dot' width='30px' height='30px' className='hh-icon' />
          <p style={{ marginLeft: '15px' }}>Gelu Ursal</p>
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
                <Link to='/option1'>Option 1</Link>
                <Link to='/option2'>Option 2</Link>
                <Link to='/option3'>Option 3</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className='home-contents'>
        {/* HOME - LESSON */}
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
        
        {/* HOME - PROGRESS */}
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