import React from 'react'
import "./Baner.css"
import banerImg from "../../assets/baner1.jpg"
import { Link } from 'react-router-dom'

const Baner = () => {
  return (
    <div className='baner'>
        <img src={banerImg} alt="baner" />
        <div className="content">
            <h2>Welcome to the store !</h2>
            <h3>Checkout the latest added items</h3>
            <h4>Find something for youself</h4>
            <Link to="/explore"><button className='styledButton'>Explore more</button></Link>
        </div>
    </div>
  )
}

export default Baner