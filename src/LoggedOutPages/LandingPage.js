import React from 'react';
import './loggedout-styles.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{backgroundColor:'transparent', display: 'flex', justifyContent: 'space-between'}}>
      <div className='lp-left'>
        <div className='navLogo'/>
        <h1 style={{fontFamily:'Bangers', backgroundColor:'transparent'}}>Discover WikangWali:<br/>Your Fun Tagalog<br/>Learning Sidekick!</h1>
        <p style={{fontFamily:'Love Ya Like A Sister', textAlign:'justify', backgroundColor:'transparent'}}>
          Designed to help kids master the beauty of the Filipino language,
          WikangWali is theperfect companion for parents want their children
          to develop a strongfoundation in Tagalog.
        </p>
        <br/>
        <Link to="/Signing">
          <button className="btnGetStarted">
            GET STARTED
          </button>
        </Link>
      </div>
      <div className='lp-right'>
        <p style={{textAlign:'right'}}>
          <Link to="/SignInPage">SIGN IN</Link>
          &nbsp;|&nbsp;
          <a href="#ContactUs" style={{backgroundColor:'transparent', color: 'black', textDecoration:'none'}}>CONTACT US</a>
        </p>
        <div className='logo-landing'/>
      </div>
    </div>
  );
}

