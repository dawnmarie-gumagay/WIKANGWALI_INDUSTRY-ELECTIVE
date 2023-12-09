import React from 'react';
import PropTypes from 'prop-types';

function ContactUsSubmit({ onClose }) {
  const handleDoneClick = () => {
    // Call the onClose function to close the pop-up
    onClose();
  };
  return(
    <div className='popup-overlay'>
      <div className='popup-container'>
        <div className='align'>
          <p >Submitted successfully</p>
          <div className='birb1' />
          
        </div>
        <br />
        <button className='lod-cancel' onClick={handleDoneClick}>
          DONE
        </button>
      </div>
    </div>
  );
}

ContactUsSubmit.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ContactUsSubmit;
