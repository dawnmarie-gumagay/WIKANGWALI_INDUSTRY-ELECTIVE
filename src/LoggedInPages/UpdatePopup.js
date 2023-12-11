import React from 'react';
import PropTypes from 'prop-types';

function UpdatePopup({ onClose }) {

  return (
    <div className='popup-overlay'>
      <div className='popup-container'>
        <h1 className='loh'>Updated Successfully</h1>
          <div className='birb2' style={{marginLeft:'100px', marginBottom:'-40px'}}/>
        <br />
        <button className='lod-cancel' style={{marginLeft:'120px'}} onClick={onClose}>
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
