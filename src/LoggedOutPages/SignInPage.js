import React from 'react';
import { Icon } from '@iconify/react';
import './loggedout-styles.css';
import { Link } from 'react-router-dom';

export default function SignInPage() {
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
          Sign in to your Account
        </p>
        <br/>
        <form className='trans-bg'>
          <label className='lbl-form'>Email</label><br/>
          <div class='trans-bg' style={{display:'flex'}}>
            <Icon icon="solar:user-outline" className='signing-icon'/>
            <input type='email' className='input-form'/>
          </div>
          
          <br/>
          <label className='lbl-form'>Password</label><br/>
          <div class='trans-bg' style={{display:'flex'}}>
            <Icon icon="solar:lock-outline" className='signing-icon'/>
            <input type='password' className='input-form'/>
          </div>
          <a href="#ForgotPass" class='trans-bg' style={{color:'grey'}}>
            Forgot Password?
          </a>
          <br/><br/><br/>
          <input type='submit' className='btnSign' value='Sign In'></input>
        </form>
        <p className='trans-bg'>
          Don't have an account? <a href='#SignUp' className='trans-bg'>Sign Up</a>
        </p> 
      </div>
    </div>
  );
}

