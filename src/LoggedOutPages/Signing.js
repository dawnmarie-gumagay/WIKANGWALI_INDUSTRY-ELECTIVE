import React from 'react';
import { Icon } from '@iconify/react';
import './loggedout-styles.css';
import { Link } from 'react-router-dom';

export default function Signing() {
  return (
    <div style={{backgroundColor:'transparent', display: 'flex', justifyContent: 'space-between'}}>

      <div className='lp-left'>
        <Link to="/LandingPage">
          <button style={{backgroundColor:"#2B6BB0", border:"none", borderRadius:"100px", cursor:'pointer'}}>
            <Icon icon="mingcute:back-fill" color="white" width="50" height="50" style={{ backgroundColor: 'transparent' }}/>
          </button>
        </Link>
        <div className='logo-sign'/>
        
      </div>

      <div className='lp-right' style={{textAlign:'center'}}>
        <h1 style={{ backgroundColor: 'transparent', fontFamily:"Bangers", fontSize:"70px",
                      color:'#2B6BB0'}}>
          WELCOME!
        </h1>
        <Link to="/SignUpPage">
          <button style={{ backgroundColor: 'transparent', border:'2px solid #2B6BB0', cursor:'pointer',
                            padding:'10px', width:'300px', borderRadius:'50px', color:'#2B6BB0',
                            fontFamily:"Bangers", fontSize:"30px"}}>
            SIGN UP
          </button>
        </Link>
        <hr style={{height:"2px", width:"100px", backgroundColor:"#2B6BB0"}}/>
        <Link to="/SignInPage">
        <button style={{ backgroundColor:'#2B6BB0', border:'2px solid #2B6BB0',
                          padding:'10px', width:'300px', borderRadius:'50px', cursor:'pointer',
                          color:'white', fontFamily:"Bangers", fontSize:"30px"}}>
            SIGN IN
          </button>
        </Link>
      </div>
    </div>
  );
}

