import './PageAssets/page-styles.css'
import { Link } from 'react-router-dom'

export function Settings(){
  return(
    <div className='settings-page'>
      <h1>Settings</h1>
      <Link to="/Settings">
        Edit Profile
      </Link>
      <Link to="/PasswordSettings">
        Edit Password
      </Link>
      <br/><hr/><br/>
      <form>
        <label className='lblUpdate'>First Name</label><br/>
        <input type='text' className='txtUpdate' value='Gelu'/><br/>
        <label className='lblUpdate'>Last Name</label><br/>
        <input type='text' className='txtUpdate' value='Ursal'/><br/><br/>
        <label className='lblUpdate'>Email</label><br/>
        <input type='text' className='txtUpdate' value='yahoo@gmail.com'/><br/><br/>
      </form>
    </div>
  )
}