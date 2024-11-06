import React from 'react'
import "./Userprofile.css"
import Navbar from '../Navbar/Navbar'
import Userinfo from './Userinfo/Userinfo'

const Userprofile = () => {
  return (
    <div className='userprofile'>
        <Navbar active={"profile"}/>
        <div className="main">
          <Userinfo/>
          <div className="change-password">
            <h3>Change password</h3>
            <form>
                 <p className='label'>Current password</p> 
                  <label className='input flex'>
                  <input type="password" />
                </label>

                <p className='label'>New password</p>
                <label className='input flex'>
                  <input type="password" />
                </label>

                <p className='label'>Confirm new password</p>
                <label className='input flex'>
                  <input type="password" />
                </label>
                <button className='styledButton'>Submit</button>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Userprofile