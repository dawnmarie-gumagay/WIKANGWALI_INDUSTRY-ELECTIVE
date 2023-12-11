import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import UpdatePopup from './UpdatePopup';

const Settings = ({ loggedInUsername }) => {
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(true);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  
  //HEADER DROPDOWN
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //FETCHING DATA
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/student/getStudentByUsername/${loggedInUsername}`);
        const data = await response.json();
        setUserData(data);
        setFirstName(data.fname);
        setLastName(data.lname);
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [loggedInUsername]);

  //FOR UPDATING FIRSTNAME, LASTNAME, & EMAIL
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Show the confirmation popup
    setShowConfirmationPopup(true);
  };
  const handleConfirmUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/student/updateStudentProfile?username=${loggedInUsername}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: firstName,
          lname: lastName,
          email: email,
        }),
      });

      if (response.ok) {
        console.log('Student updated successfully');
        setUserData({
          ...userData,
          fname: firstName,
          lname: lastName,
          email: email,
        });
        setShowUpdatePopup(true); // Set the state to show the pop-up
      } else {
        console.error('Failed to update student');
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Failed to update student';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Error updating student: ' + error.message || 'Unknown error');
    }

    // Close the confirmation popup
    setShowConfirmationPopup(false);
  };

  //FOR UPDATING PASSWORD
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
  
    // Password validation logic
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert(
        'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one special character.'
      );
      return;
    }
  
    // Show the confirmation popup
    setShowConfirmationPopup(true);
  };

  const handleConfirmUpdatePassword = async () => {
    // Close the confirmation popup
    setShowConfirmationPopup(false);

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/student/updateStudentPassword?username=${loggedInUsername}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: password,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      });

      if (response.ok) {
        console.log('Password updated successfully');
        // Clear the password fields after a successful update
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowUpdatePopup(true); // Set the state to show the pop-up
      } else {
        console.error('Failed to update password');
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Failed to update password';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password: ' + error.message || 'Unknown error');
    }
  };

  //TOGGLE BETWEEN "EDIT PASSWORD" and "EDIT PROFILE"
  const handleToggleForm = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  return (
    <div className='settings-page'>
      {/* Overlay */}
      {showConfirmationPopup && <div className='overlay'></div>}
      <div className='hh-container'>
        <Icon icon="solar:settings-outline" color="white" width="50" height="50" className='hh-icon'/>
        <h1 className='hh-greet'>SETTINGS</h1>
        <div className='hh-container2'>
          <Icon icon='ion:notifications' width='30px' height='30px' className='hh-icon' />
          <Icon icon='noto:diamond-with-a-dot' width='30px' height='30px' className='hh-icon' />
          <p style={{ marginLeft: '15px' }}>{userData?.fname} {userData?.lname}</p>
          <div className='dropdown-container'>
            <Icon
              icon='ic:round-arrow-drop-down'
              width='30px'
              height='30px'
              className='hh-icon'
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className='dropdown-content'>
                <Link to='/Settings'>Edit Profile</Link>
                <Link to='/Achievements'>Your Achievements</Link>
                <Link to='/Parent'>Your Parent</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      
      <div className='tblProfile'>
        <table className='settings-table'>
          <tbody>
            <tr>
              <td>Your Profile</td>
            </tr>
            <tr>
              <td className='info-table'>Username</td>
              <td className='value-table'>{loggedInUsername}</td>
            </tr>
            <tr>
              <td className='info-table'>First Name</td>
              <td className='value-table'>{userData?.fname || firstName}</td>
            </tr>
            <tr>
              <td className='info-table'>Last Name</td>
              <td className='value-table'>{userData?.lname || lastName}</td>
            </tr>
            <tr>
              <td className='info-table'>Email</td>
              <td className='value-table'>{userData?.email || email}</td>
            </tr>
          </tbody>
        </table>
        
        <button className='edit-btns' onClick={handleToggleForm}>
          {isEditingProfile ? 'Edit Password' : 'Edit Profile'}
        </button>
      </div>

      <hr className='pdiv'/>

      {showUpdatePopup && <UpdatePopup onClose={() => setShowUpdatePopup(false)} />} {/* Render the pop-up component */}
      
      {/* Confirmation Popup */}
      {showConfirmationPopup && (
        <div className='confirmation-popup'>
          <p>Are you sure you want to update your profile?</p>
          <button onClick={isEditingProfile ? handleConfirmUpdate : handleConfirmUpdatePassword}>Yes</button>
          <button onClick={() => setShowConfirmationPopup(false)}>No</button>
        </div>
      )}

      {isEditingProfile ? (
        <form className='updateProfile' onSubmit={handleUpdate}>
          <div style={{display:'flex'}}>
            <div>
              <label className='lblUpdate'>First Name</label><br />
              <input type='text' className='txtUpdate' value={firstName} onChange={(e) => setFirstName(e.target.value)} required/><br />
            </div>
            
            <div>
              <label className='lblUpdate'>Last Name</label><br />
              <input type='text' className='txtUpdate' value={lastName} onChange={(e) => setLastName(e.target.value)} required/><br />
            </div>
          </div>
          <div style={{marginTop:'10px'}}>
            <label className='lblUpdate'>Email</label><br />
          <input type='text' className='txtUpdate' style={{width:'350px'}} value={email} onChange={(e) => setEmail(e.target.value)} required/><br /><br />
          </div>
          
          <input type='submit' className='btnUpdatee' value="Update" />
        </form>
      ) : (
        <form className='updatePassword' onSubmit={handleUpdatePassword}>
          <div>
            <label className='lblUpdate'>Old Password</label><br />
            <input type='password' className='txtUpdate' style={{width:'350px'}} value={password} onChange={(e) => setPassword(e.target.value)} required/><br />
          </div>
          
          <div style={{display:'flex', marginTop:'10px'}}>
            <div>
              <label className='lblUpdate'>New Password</label><br />
              <input type='password' className='txtUpdate' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/><br />
            </div>

            <div>
              <label className='lblUpdate'>Confirm Password</label><br />
              <input type='password' className='txtUpdate' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/><br /><br />
            </div>
          </div>
          
          <input type='submit' className='btnUpdatee' value="Update" />
        </form>
      )}
    </div>
  );
};

Settings.propTypes = {
  loggedInUsername: PropTypes.string.isRequired,
};

export default Settings;
