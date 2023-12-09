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


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/student/getStudentByUsername/${loggedInUsername}`);
        const data = await response.json();
        setUserData(data);
        setFirstName(data.fname || '');
        setLastName(data.lname || '');
        setEmail(data.email || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [loggedInUsername]);

  const handleUpdate = async (e) => {
    e.preventDefault();

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
        alert('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Error updating student:', error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
  
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
          oldPassword: password, // Use the correct state variable for old password
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
        alert('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password:', error);
    }
  };
  

  const handleToggleForm = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  return (
    <div className='settings-page'>
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

      <table className='settings-table'>
        <tbody>
          <tr>
            <td className='info-table'>Username</td>
            <td className='value-table'>{loggedInUsername}</td>
          </tr>
          <tr>
            <td className='info-table'>First Name</td>
            <td className='value-table'>{firstName}</td>
          </tr>
          <tr>
            <td className='info-table'>Last Name</td>
            <td className='value-table'>{lastName}</td>
          </tr>
          <tr>
            <td className='info-table'>Email</td>
            <td className='value-table'>{email}</td>
          </tr>
        </tbody>
      </table>

      <br/>
      <button className='edit-btns' onClick={handleToggleForm}>
        {isEditingProfile ? 'Edit Password' : 'Edit Profile'}
      </button>
      <br />
      <br />
      <hr />
      <br />

      {showUpdatePopup && <UpdatePopup onClose={() => setShowUpdatePopup(false)} />} {/* Render the pop-up component */}

      {isEditingProfile ? (
        <form className='updateProfile' onSubmit={handleUpdate}>
          <div style={{display:'flex'}}>
            <div>
              <label className='lblUpdate'>First Name</label><br />
              <input type='text' className='txtUpdate' value={firstName} onChange={(e) => setFirstName(e.target.value)} /><br />
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              <label className='lblUpdate'>Last Name</label><br />
              <input type='text' className='txtUpdate' value={lastName} onChange={(e) => setLastName(e.target.value)} /><br />
            </div>
          </div>
          <label className='lblUpdate'>Email</label><br />
          <input type='text' className='txtUpdate' value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
          <input type='submit' value="Update" />
        </form>
      ) : (
        <form className='updatePassword' onSubmit={handleUpdatePassword}>
          <label className='lblUpdate'>Old Password</label><br />
          <input type='password' className='txtUpdate' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
          <div style={{display:'flex'}}>
            <div>
              <label className='lblUpdate'>New Password</label><br />
              <input type='password' className='txtUpdate' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><br />
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              <label className='lblUpdate'>Confirm Password</label><br />
              <input type='password' className='txtUpdate' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br /><br />
            </div>
          </div>
          
          <input type='submit' value="Update" />
        </form>
      )}
    </div>
  );
};

Settings.propTypes = {
  loggedInUsername: PropTypes.string.isRequired,
};

export default Settings;
