import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ParentModeConfirm({ onClose, onSwitch }) {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleSwitch = () => {

    onSwitch(); // Call the onLogout function passed as a prop

    // Redirect to ParentHome after successful signin
    navigate('/ParentHome');
  };

  return (
    <div className='popup-overlay'>
      <div className='popup-container'>
        <h1 className='loh'>Switch to Parent Mode</h1>
        <div className='logout-birb' />
        <p className='logout-msg'>Enter Password</p>
        <input type='password'/>
        <br />
        <button className='lod-cancel' onClick={onClose}>
          CANCEL
        </button>
        <button className='lod-logout' onClick={handleSwitch}>
          ENTER
        </button>
      </div>
    </div>
  );
}

// Prop types validation
ParentModeConfirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
};

export default ParentModeConfirm;
