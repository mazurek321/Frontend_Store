import React from 'react'
import "./HomePageAnnouncement.css"
import headphones from "../../../assets/sluchawki.webp"
import { Link } from 'react-router-dom'


const HomePageAnnouncement = () => {
  return (
    <div className='HomePageAnnouncement'>
        <button className='icon'><span className="material-symbols-outlined">favorite</span></button>
        <Link to="/">
            <div className="image">
                <img src={headphones} />
            </div>
            <h3>Headphones</h3>
            <div>
                <span className='price'>259.99 zł</span>
            </div>
        </Link>
        <button className='styledButton'>Add to cart</button>
    </div>
  )
}

export default HomePageAnnouncement