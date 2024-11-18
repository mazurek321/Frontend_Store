import React from 'react'
import "./Saved.css"
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import headphones from "../../assets/sluchawki.webp"


const Saved = () => {
  return (
    <div className='saved'>
        <Navbar active={"saved"}/>
        <div className="saved-container container">
            <Header text="Saved announcements" icons={true}/>


            <div className="saved item flex">
              <span class="material-symbols-outlined icon">delete</span>
              <Link to="/" className='flex'>
                  <div className="image">
                      <img src={headphones} alt="headphones" />
                  </div>
                  <div className="description">
                      <h4>Headphones</h4>
                      <p>Cena: <span>239.99 zł</span></p>
                      <div className="color">Color: <span>red</span></div>
                      <div className="size">Size: <span>M</span></div>
                  </div>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Saved