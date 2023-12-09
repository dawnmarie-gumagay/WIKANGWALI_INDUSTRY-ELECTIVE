import React from 'react';
import PropTypes from 'prop-types';

function UpdatePopup({ onClose }) {

  return (
    <div className='popup-overlay'>
      <div className='popup-container'>
        <h1 className='loh'>Updated Successfully</h1>
          <div className='logout-birb' />
        <br />
        <button className='lod-cancel' onClick={onClose}>
          DONE
        </button>
      </div>
    </div>
  );
}

// Prop types validation
UpdatePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UpdatePopup;
