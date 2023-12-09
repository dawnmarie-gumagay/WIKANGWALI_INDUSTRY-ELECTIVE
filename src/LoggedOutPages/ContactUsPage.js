import { Icon } from '@iconify/react';
import './loggedout-styles.css';
import { Link } from 'react-router-dom';
import { useState , React } from 'react';
import ContactUsSubmit from './ContactUsSubmit';

export default function ContactUsPage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Add your form submission logic here

    // Set the state to show the pop-up
    setShowPopup(true);
  };

  const closePopup = () => {
    // Set the state to hide the pop-up
    setShowPopup(false);
  };



  return (
    <div style={{backgroundColor:'transparent', display: 'flex', justifyContent: 'space-between'}}>

      <div className='lp-left'>
        <div className='au-logo' />
        <h1>CONTACT US</h1>
        <h3>We're here to help you.</h3>

        <div className='about-div'>
          <div className='circle-icon'>
            <Icon icon="ph:phone-fill" className='about-icon'/>
          </div>
          <div>
            <h3>PHONE</h3>
            <p>+63 992 123 4567</p>
          </div>
        </div>

        <div className='about-div'>
          <div className='circle-icon'>
            <Icon icon="ic:outline-email" className='about-icon'/>
          </div>
          <div>
            <h3>EMAIL</h3>
            <p>wikangwali@gmail.com</p>
          </div>
        </div>

        <div className='about-div'>
          <div className='circle-icon'>
            <Icon icon="basil:location-solid" className='about-icon'/>
          </div>
          <div>
            <h3>LOCATION</h3>
            <p>Cebu City</p>
          </div>
        </div>

      </div>

      <div className='lp-right' style={{textAlign:'center'}}>
        <p style={{ textAlign: 'right' }}>
          <Link to="/">WELCOME</Link>
          &nbsp;|&nbsp;
          <Link to="/AboutUsPage">ABOUT US</Link>
        </p>

        <h1>LET'S TALK</h1>
        <h3>Feel free to drop us a line below</h3>
        <br/>
        <br/>
        <form className='contact-form' onSubmit={handleSubmit}>
          <input type='text' className='input-form' placeholder='Your name' required/> <br/><br/>
          <input type='email' className='input-form' placeholder='Email' required/><br/><br/>
          <input type="text" id="phone" name="phone" className='input-form' placeholder='Phone Number'/><br/><br/>
          <input type='text' className='input-form' placeholder='Message' required/> <br/>
          <input type='submit' value='Submit' />
        </form>

        {/* Form Submission Popup */}
        {showPopup && <ContactUsSubmit onClose={closePopup} />}
      </div>
    </div>
  );
}

