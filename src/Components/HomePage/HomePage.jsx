import React from 'react'
import "./HomePage.css"
import Navbar from '../Navbar/Navbar'
import LatestAdded from './LatestAdded/LatestAdded'
import HomePageAnnouncement from './HomePageAnnouncements/HomePageAnnouncement'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='homePage'>
      <Navbar active={"home"}/>
      <div className="main">
        <LatestAdded/>
        <div className="home-announcements">

          <Link to="/">
            <h3 className='header flex'>Books <span class="material-symbols-outlined">arrow_forward_ios</span></h3>
          </Link>
          <div className="section books">
            <div className="content flex">
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
              <HomePageAnnouncement/>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage