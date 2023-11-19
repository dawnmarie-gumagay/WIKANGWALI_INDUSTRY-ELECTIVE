import './PageAssets/page-styles.css'

export function LogOutConfirm(){
  return(
    <div className='lod'>
      <h1 className='loh'>LOG OUT</h1>
        <div className='align'>
          <div className='logout-birb'/>
          <p>Are you sure<br/>you want to logout?</p>
        </div>
        
        <br/>
        <button className='lod-cancel'>CANCEL</button>
        <button className='lod-logout'>LOG OUT</button>
    </div>
  )
}