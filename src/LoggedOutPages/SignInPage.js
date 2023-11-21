// SignInPage.js
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const SignInPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your API returns a success status when login is successful
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Call the onLogin function to update the parent component's state
        onLogin();
        console.log('Login successful');
      } else if (response.status === 401) {
        // If status is 401, set invalidCredentials to true
        setInvalidCredentials(true);
        console.error('Invalid credentials');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'space-between' }}>
      {/* ... existing code ... */}
      <div className='lp-right' style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Bangers', fontSize: '70px', color: '#2B6BB0' }}>
          WELCOME!
        </h1>
        <p style={{ fontFamily: 'Love Ya Like A Sister', color: '#2B6BB0' }}>
          Sign in to your Account
        </p>
        <br />
        <form onSubmit={handleSubmit}>
          {/* ... existing code ... */}
          <input type='submit' className='btnSign' value='Sign In' />
        </form>
        {invalidCredentials && (
          <p style={{ color: 'red' }}>
            Invalid credentials. Please check your username and password.
          </p>
        )}
        <p className='trans-bg'>
          Don't have an account? <Link to="/SignUpPage">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
