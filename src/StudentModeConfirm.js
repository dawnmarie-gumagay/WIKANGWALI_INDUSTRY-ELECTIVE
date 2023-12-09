import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function StudentModeConfirm({ onClose, onSwitch }) {
  const navigate = useNavigate();

  const handleSwitch = () => {
    onSwitch(); // Call the onSwitch function passed as a prop

    // Redirect to Home after successful switch to student mode
    navigate('/Home');
  };

  return (
    <div className='popup-overlay'>
      <div className='popup-container'>
        <h1 className='loh'>Switch to Student Mode</h1>
        <div className='logout-birb' />
        <p className='logout-msg'>Are you sure you want to return to student mode?</p>
        <br />
        <button className='lod-cancel' onClick={onClose}>
          CANCEL
        </button>
        <button className='lod-logout' onClick={handleSwitch}>
          CONFIRM
        </button>
      </div>
    </div>
  );
}

// Prop types validation
StudentModeConfirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
};

export default StudentModeConfirm;
