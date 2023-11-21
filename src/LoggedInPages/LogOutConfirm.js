import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import './PageAssets/page-styles.css';

export function LogOutConfirm({ onClose }) {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleLogOut = () => {
    // Perform the log-out action here
    console.log('Logging out...');
    // You can call a function to clear authentication state, redirect, etc.
    // For now, let's simulate a refresh to the login state
    window.location.reload();
  };

  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot) {
    console.error("Portal root element not found. Add a div with id 'portal-root' to your HTML.");
    return null;
  }

  return ReactDOM.createPortal(
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
    </div>,
    portalRoot
  );
}
