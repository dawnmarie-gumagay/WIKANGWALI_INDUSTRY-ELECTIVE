import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function LogOutConfirm({ onClose, onLogout }) {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleLogOut = () => {
    // Perform the log-out action
    console.log('Logging out...');
    onLogout(); // Call the onLogout function passed as a prop

    // Redirect to LandingPage after successful logout
    navigate('/');
  };

  return (
    <div className='popup-overlay'>
      <div className='popup-container'>
        <h1 className='loh'>LOG OUT</h1>
        <div className='align'>
          <div className='logout-birb' />
          <p className='logout-msg'>Are you sure<br />you want to logout?</p>
        </div>
        <br />
        <button className='lod-cancel' onClick={onClose}>
          CANCEL
        </button>
        <button className='lod-logout' onClick={handleLogOut}>
          LOG OUT
        </button>
      </div>
    </div>
  );
}

// Prop types validation
LogOutConfirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default LogOutConfirm;
