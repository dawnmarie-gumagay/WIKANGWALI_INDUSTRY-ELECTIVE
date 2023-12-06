import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


function AdminDELETEStudent({ onClose, onDelete }) {

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <h1 className='loh'>LOG OUT</h1>
        <div className='align'>
          <p className='logout-msg'>Are you sure<br />you want to delete user?</p>
        </div>
        <br />
        <button className='lod-cancel' onClick={onClose}>
          Cancel
        </button>
        <button className='lod-logout' onClick={handleDelete}>
          Confirm
        </button>
      </div>
    </div>,
  );
}

// Prop types validation
AdminDELETEStudent.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminDELETEStudent;
