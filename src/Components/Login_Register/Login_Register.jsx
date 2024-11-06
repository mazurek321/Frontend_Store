import React, { useState } from 'react'
import "./Login_Register.css"
import Login from './Login'
import Side_Login from './Side_Login'
import Side_Register from './Side_Register'
import Register from './Register'

const Login_Register = () => {
  const [clicked, setClicked] = useState(false)
  const [backgroundChange, setBackgroundChange] = useState(false)
  const [exiting, setExiting] = useState(false)

  const handleClick=()=>{
    setBackgroundChange(!backgroundChange)
    setExiting(true)
    setTimeout(()=>{
      setClicked(!clicked)
      setExiting(false)
    }, 225)
  }
  
  return (
    <div className='Login_Register'>
        <div className="login_section">
          {clicked ? 
            <>
              <div className="side">
                <Side_Register exiting={exiting}/>
              </div>
              <Register setClicked={handleClick} exiting={exiting}/>
            </>
            :
            <>
              <Login setClicked={handleClick} exiting={exiting}/>
              <div className="side">
                <Side_Login exiting={exiting}/>
              </div>
            </>
          }
          <div className={`background ${backgroundChange && 'left'}`}></div>
        </div>
    </div>
  )
}

export default Login_Register