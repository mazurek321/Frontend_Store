import React from 'react'
import "./Userprofile.css"
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'

const Userprofile = () => {
  return (
    <div className='userprofile'>
        <Navbar active={"profile"}/>
        <div className="container">
          <Header text="User profile"/>
        </div>
    </div>
  )
}

export default Userprofile