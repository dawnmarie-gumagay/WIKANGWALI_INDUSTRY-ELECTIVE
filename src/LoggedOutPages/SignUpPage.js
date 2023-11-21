import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './loggedout-styles.css';
import { Link } from 'react-router-dom';

export default function SignInPage() {

  const[username, setUsername]=useState('')
  const[email, setEmail]=useState('')
  const[pass, setPass]=useState('')
  const[confirmPass, setConfirmPass]=useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Added state for validation
  const[user, setUser] = useState([])

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPass(newPassword);
    setPasswordsMatch(newPassword === confirmPass);
  };
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPass(newConfirmPassword);
    setPasswordsMatch(pass === newConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordsMatch) {
        const userData = {
            username,
            email,
            password: pass,
        };
        try {
            const response = await fetch('http://localhost:8080/user/insertUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                console.log('User registered successfully!');
                console.log(userData);
            } else {
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.error('Passwords do not match');
    }
  };

  return (
    <div style={{backgroundColor:'transparent', display: 'flex', justifyContent: 'space-between'}}>
      <div className='lp-left trans-bg'>
        <Link to="/Signing">
          <button style={{backgroundColor:"#2B6BB0", border:"none", borderRadius:"100px", cursor:'pointer'}}>
            <Icon icon="mingcute:back-fill" color="white" width="50" height="50" style={{ backgroundColor: 'transparent' }}/>
          </button>
        </Link>
        <div className='logo-sign'/>
        
      </div>

      <div className='lp-right trans-bg' style={{textAlign:'center'}}>
        <h1 className='trans-bg' style={{ fontFamily:"Bangers", fontSize:"70px", color:'#2B6BB0'}}>
          WELCOME!
        </h1>
        <p style={{backgroundColor:'transparent', fontFamily:'Love Ya Like A Sister', color:'#2B6BB0'
                    }}>
          Create your account
        </p>
        <br/>

        <form className='trans-bg' onSubmit={handleSubmit}>
          {/*USERNAME*/}
          <label className='lbl-form'>Username</label><br/>
          <div class='trans-bg' style={{display:'flex'}}>
            <Icon icon="solar:user-outline" className='signing-icon'/>
            <input type='text' className='input-form' required
              value={username}
              onChange={(e)=>setUsername(e.target.value)}/>
          </div>

          {/*EMAIL*/}
          <label className='lbl-form'>Email</label><br/>
          <div class='trans-bg' style={{display:'flex'}}>
            <Icon icon="ic:outline-email" className='signing-icon'/>
            <input type='email' className='input-form' value={email} required
              onChange={(e)=>setEmail(e.target.value)}/>
          </div>

          {/* PASSWORD */}
          <label className="lbl-form">Password</label><br />
          <div className="trans-bg" style={{ display: 'flex' }}>
            <Icon icon="solar:lock-outline" className="signing-icon" />
            <input type="password" className="input-form" required
              value={pass}
              onChange={handlePasswordChange}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <label className="lbl-form">Confirm Password</label><br />
          <div className="trans-bg" style={{ display: 'flex' }}>
            <Icon icon="solar:lock-outline" className="signing-icon" />
            <input type="password" className="input-form" required
              value={confirmPass}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <br/>
          <input type='submit' className='btnSign' value='Sign Up'></input>
        </form>
        <p className='trans-bg'>
          Already have an account? <Link to="/SignInPage">Sign In</Link>
        </p> 
      </div>
    </div>
  );
}

