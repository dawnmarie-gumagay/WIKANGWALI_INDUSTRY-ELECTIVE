import React, { useState } from 'react';
import './loggedout-styles.css';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

export default function ResetPassword2() {
  const [username, setUsername] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validatePassword = () => {
    // Add your password validation logic here
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/student/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          resetCode: resetCode,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Handle success, e.g., show a success message
        console.log('Password reset successfully:', result.message);
        alert('Password reset successfully!');
        // Redirect to another page after successful password reset
        navigate('/ResetPasswordSuccess'); // Change this path based on your application's routing
      } else {
        const error = await response.json();
        // Handle error, set error message state
        setErrorMessage(error.message);
        console.error('Error resetting password:', error.message);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'space-between' }}>
      <div className='lp-left'>
        <Link to="/ResetPassword">
          <button style={{ backgroundColor: '#2B6BB0', border: 'none', borderRadius: '100px', cursor: 'pointer' }}>
            <Icon icon="mingcute:back-fill" color="white" width="50" height="50" style={{ backgroundColor: 'transparent' }} />
          </button>
        </Link>
        <div className='logo-sign' />
      </div>
      <div className='lp-right' style={{ textAlign: 'center' }}>
        <br/>
        <h1 style={{ fontFamily: 'Bangers', fontSize: '70px', color: '#2B6BB0' }}>
          RESET PASSWORD
        </h1>
        <p style={{ fontFamily: 'Love Ya Like A Sister', color: '#2B6BB0' }}>
          Enter username and the correct code.
        </p>
        <br/>
        <br/>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <br/>
        <form onSubmit={handleSubmit}>
          {/* USERNAME */}
          <div className='input-div'>
            <Icon icon="solar:user-outline" className='signing-icon' />
            &nbsp;
            <input
              type='text'
              className='input-form2'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
            />
          </div>
          <br/>
          {/* RESET CODE INPUT */}
          <div className='input-div'>
            <Icon icon="mdi:password-reset" className='signing-icon' />
            &nbsp;
            <input
              type='text'
              className='input-form2'
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              placeholder='Reset Code'
              pattern="\d{4}" // This pattern allows only 4-digit numbers
              title="Please enter a 4-digit number" // Error message if the pattern is not matched
              required
            />
          </div>
          <br/>
          {/* NEW PASSWORD */}
          <div className='input-div'>
            <Icon icon="solar:lock-outline" className='signing-icon' />
            &nbsp;
            <input
              type='password'
              className='input-form2'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder='New Password'
              required
            />
          </div>
          <br/>
          {/* CONFIRM PASSWORD */}
          <div className='input-div'>
            <Icon icon="solar:lock-outline" className='signing-icon' />
            &nbsp;
            <input
              type='password'
              className='input-form2'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm Password'
              required
            />
          </div>

          <br/>
          <input type='submit' className='btnSign' value='Reset Password' />
        </form>
      </div>
    </div>
  );
}
