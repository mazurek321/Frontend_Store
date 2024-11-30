import React, { useEffect, useState } from 'react'
import "./Login_Register.css"
import Login from './Login'
import Side_Login from './Side_Login'
import Side_Register from './Side_Register'
import Register from './Register'
import MessageBox from '../MessageBox/MessageBox'

const Login_Register = ({user, setUser}) => {
  const [clicked, setClicked] = useState(false)
  const [backgroundChange, setBackgroundChange] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  let timer;

  const handleClick=()=>{
    setBackgroundChange(!backgroundChange)
    setExiting(true)
    setTimeout(()=>{
      setClicked(!clicked)
      setExiting(false)
    }, 225)
  }

  useEffect(()=>{
    timer = setTimeout(()=>{
        setVisible(false)
    }, 6000)
    return ()=>{clearTimeout(timer)}
  }, [visible])
  
  return (
    <div className='Login_Register'>
        {visible && <MessageBox action={"cancel"} message={message}/>}
        <div className="login_section">
          {clicked ? 
            <>
              <div className="side">
                <Side_Register exiting={exiting}/>
              </div>
              <Register setClicked={handleClick} exiting={exiting} setVisible={setVisible} setMessage={setMessage}/>
            </>
            :
            <>
              <Login setClicked={handleClick} exiting={exiting} setVisible={setVisible} setMessage={setMessage} user={user} setUser={setUser}/>
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