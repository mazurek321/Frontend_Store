import React, { useRef } from 'react'
import "./HomePage.css"
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import Baner from '../Baner/Baner'
import Announcement from './Announcement/Announcement'

const HomePage = () => {
  const left = useRef()
  const right = useRef()
  

  return (
    <div className='homePage'>
      <Navbar active={"home"}/>
      <Baner/>
      <h3 className='section-header container flex'>
        Latest added items
      </h3>
      <div className="section container flex">
        <Announcement/>
        <Announcement/>
        <Announcement/>
        <Announcement/>
      </div>


      <h3 className='section-header container flex'>
        Snowboard
        <span class="material-symbols-outlined icon">arrow_forward_ios</span>      
      </h3>
      <div className="section container flex">
        <Announcement/>
        <Announcement/>
        <Announcement/>
        <Announcement/>
        <Announcement/>
        <Announcement/>
        <Announcement/>
        <Announcement/>
        <Announcement/>
        <Announcement/>
        <Announcement/>
      </div>
    </div>
  )
}

export default HomePage