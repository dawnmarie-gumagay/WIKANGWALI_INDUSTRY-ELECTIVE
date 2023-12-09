import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './loggedout-styles.css';
import { Link } from 'react-router-dom';

export default function SignInPage() {

  const[username, setUsername]=useState('')
  const[fname, setFname]=useState('')
  const[lname, setLname]=useState('')
  const[email, setEmail]=useState('')
  const[pass, setPass]=useState('')
  const[confirmPass, setConfirmPass]=useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Added state for validation
  const[passwordIsValid, setPasswordIsValid] = useState(true);


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPass(newPassword);
    setPasswordsMatch(newPassword === confirmPass);
  
    // Password complexity requirements
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  
    const isPasswordValid =
      newPassword.length >= 8 &&
      regexUpperCase.test(newPassword) &&
      regexLowerCase.test(newPassword) &&
      regexSpecialChar.test(newPassword);
  
    // Set a state variable indicating whether the password meets the complexity requirements
    setPasswordIsValid(isPasswordValid);
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
            fname,
            lname,
            email,
            password: pass,
        };
        try {
            const response = await fetch('http://localhost:8080/student/insertStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('User registered successfully!');
                console.log(responseData); // Log the response data
                alert('User registered successfully!');
            } else {
                console.error('Failed to register user');
                alert('Failed to register user');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error:', error);
        }
    } else {
        console.error('Passwords do not match');
        alert('Passwords do not match');
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
        
        {!passwordIsValid && (
          <p className="password-requirements">
            Password must be at least 8 characters long and include uppercase, lowercase, and special characters.
          </p>
        )}

        <form onSubmit={handleSubmit}>

            {/*USERNAME*/}
            <div>
              <div className='input-div'>
                <Icon icon="solar:user-outline" className='signing-icon'/>
                <input type='text' className='long-input' required
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  placeholder='Username'/>
              </div>
            </div>
            <br/>
            <div>
              {/*EMAIL*/}
              <div className='input-div'>
                <Icon icon="ic:outline-email" className='signing-icon'/>
                &nbsp;
                <input type='email' className='long-input' value={email} required
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder='Email'/>
              </div>
            </div>
          <br/>
          <div className='su-group'>
            <div>
              {/*FIRST NAME*/}
              <div className='input-div'>
                <Icon icon="solar:user-outline" className='signing-icon'/>
                &nbsp;
                <input type='text' className='input-form' required
                  value={fname}
                  onChange={(e)=>setFname(e.target.value)}
                  placeholder='First Name'/>
              </div>
            </div>
            <br/>
            &nbsp;&nbsp;
            <div>
              {/*LAST NAME*/}
              <div className='input-div'>
                
                <input type='text' className='input-form' required
                  value={lname}
                  onChange={(e)=>setLname(e.target.value)}
                  placeholder='Last Name'/>
              </div>
            </div>
            
          </div>
          

          <br/>
          <div className='su-group'>
            <div>
              {/* PASSWORD */}
              <div className='input-div'>
                <Icon icon="solar:lock-outline" className="signing-icon"/>
                &nbsp;
                <input
                  type="password"
                  className={`input-form ${passwordIsValid ? '' : 'invalid-password'}`}
                  required
                  value={pass}
                  onChange={handlePasswordChange}
                  placeholder='Password'
                />
              </div>
            </div>
            &nbsp;&nbsp;
            <div>
              {/* CONFIRM PASSWORD */}
              <div className='input-div'>
                <input type="password" className="input-form" required
                  value={confirmPass}
                  onChange={handleConfirmPasswordChange}
                  placeholder='Confirm Password'
                />
              </div>
            </div>
            
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

