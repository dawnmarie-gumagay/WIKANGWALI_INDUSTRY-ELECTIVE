import React, { useState } from 'react';
import './loggedout-styles.css';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/student/generateResetCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Handle success, e.g., show a success message
        console.log(result.message);
        alert(result.message);
        navigate('/ResetPassword2');
      } else {
        const error = await response.json();
        // Handle error, set error message state
        setErrorMessage(error.message);
        console.error('Error generating reset code:', error.message);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Error generating reset code:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'space-between' }}>
      <div className='lp-left'>
        <Link to="/SignInPage">
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
          Enter username to generate reset code.
        </p>
        <br/>
        <br/>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <br/>

        <form onSubmit={handleSubmit}>
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
          <input type='submit' className='btnSign' value='Generate Code' />
        </form>
        
      </div>
    </div>
  );
}
