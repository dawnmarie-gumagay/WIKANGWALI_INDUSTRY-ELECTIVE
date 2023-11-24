import './PageAssets/page-styles.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Settings() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/getAllUsers');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className='settings-page'>
      <h1>Settings</h1>
      <Link to="/Settings">Edit Profile</Link>
      <Link to="/PasswordSettings">Edit Password</Link>
      <br />
      <hr />
      <br />
      {userData && userData.length > 0 && (
        <form>
          <label className='lblUpdate'>First Name</label><br />
          <input type='text' className='txtUpdate' value={userData[0].fname} /><br />
          <label className='lblUpdate'>Last Name</label><br />
          <input type='text' className='txtUpdate' value={userData[0].lname} /><br /><br />
          <label className='lblUpdate'>Email</label><br />
          <input type='text' className='txtUpdate' value={userData[0].email} /><br /><br />
          <input type='submit' value="Update" />
        </form>
      )}
    </div>
  );
}
