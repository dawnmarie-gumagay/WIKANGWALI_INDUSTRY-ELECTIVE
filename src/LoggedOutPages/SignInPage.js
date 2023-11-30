import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignInPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  
  // Get the navigate function from useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8080/student/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        // Check the success field in the response
        if (responseData.success) {
            // Login successful
            // Pass the logged-in username to the onLogin function
            onLogin(username);
            
            // Redirect to the admin page if the username is 'admin' and password is 'admin'
            if (username.toLowerCase() === 'admin' && password === 'admin') {
                navigate('/AdminHome');
            } else {
                // Redirect to the home page for other users
                navigate('/Home');
            }
            console.log('Login successful. Welcome ' + username + '!');
            alert('Login successful. Welcome ' + username + '!');
        } else {
            // Login failed
            setInvalidCredentials(true);
            console.error('Login failed:', responseData.message);
            alert('Login failed:', responseData.message);
        }
      } else {
          console.error('Login failed:', responseData.message);
          alert('Login failed:', responseData.message);
      }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'space-between' }}>
      <div className='lp-left'>
        <Link to="/Signing">
          <button style={{ backgroundColor: '#2B6BB0', border: 'none', borderRadius: '100px', cursor: 'pointer' }}>
            <Icon icon="mingcute:back-fill" color="white" width="50" height="50" style={{ backgroundColor: 'transparent' }} />
          </button>
        </Link>
        <div className='logo-sign' />
      </div>
      <div className='lp-right' style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Bangers', fontSize: '70px', color: '#2B6BB0' }}>
          WELCOME!
        </h1>
        <p style={{ fontFamily: 'Love Ya Like A Sister', color: '#2B6BB0' }}>
          Sign in to your Account
        </p>
        <br />
        <form onSubmit={handleSubmit}>
          <label className='lbl-form'>Username</label><br />
          <div style={{ display: 'flex' }}>
            <Icon icon="solar:user-outline" className='signing-icon' />
            <input type='text' className='input-form' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <br />
          <label className='lbl-form'>Password</label><br />
          <div style={{ display: 'flex' }}>
            <Icon icon="solar:lock-outline" className='signing-icon' />
            <input type='password' className='input-form' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <a href="#ForgotPass" style={{ color: 'grey' }}>
            Forgot Password?
          </a>
          <br /><br />
          <input type='submit' className='btnSign' value='Sign In' />
        </form>
        {invalidCredentials && (
          <p style={{ color: 'red' }}>
            Invalid credentials. Please check your username and password.
          </p>
        )}
        <p>
          Don't have an account? <Link to="/SignUpPage">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

SignInPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default SignInPage;
