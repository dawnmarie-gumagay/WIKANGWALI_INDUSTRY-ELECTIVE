import './loggedout-styles.css';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function ResetPasswordSuccess() {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='lp-left'>
        <Link to="/SignInPage">
          <button style={{ backgroundColor: '#2B6BB0', border: 'none', borderRadius: '100px', cursor: 'pointer' }}>
            <Icon icon="mingcute:back-fill" color="white" width="50" height="50" style={{ backgroundColor: 'transparent' }} />
          </button>
        </Link>
        <div className='logo-sign' />
      </div>
      <div className='lp-right' style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <br/><br/><br/>
        <h1 style={{ fontFamily: 'Bangers', fontSize: '70px', color: '#2B6BB0' }}>
          RESET PASSWORD
        </h1>
        <h3 style={{ fontFamily: 'Love Ya Like A Sister', color: '#2B6BB0' }}>
          Your password has been resetted!<br/>
          Proceed to Sign in
          <br/><br/>
          <div className='birb2'/>
        </h3>

        <Link to='/SignInPage' className='btnSign'
          style={{width:'200px'}}>Sign In</Link>
      </div>
    </div>
  );
}
