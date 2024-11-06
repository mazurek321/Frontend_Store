import React from 'react'
import "./Messages.css"
import Navbar from '../Navbar/Navbar'
import headphones from "../../assets/sluchawki.webp"
import { Link } from 'react-router-dom'

const Messages = () => {
  return (
    <div className='messages'>
         <Navbar active={"messages"}/>
         <div className="messages-container main">
            <h3>Messages</h3>
            <div className="message flex">
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
                  <div className="orderInfo">
                    <div className="orderedAt">Ordered at: <span>18.12.2022</span></div>
                    <Link to="/profile">Ordered by: <span>Magda gessler</span></Link>
                    <div className="delivery">Delivery: <span>Inpost 15.00 zł</span></div>
                  </div>
                  <button className='styledButton'>Manage</button>
            </div>



            <div className="message flex">
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
                  <div className="orderInfo">
                    <div className="orderedAt">Ordered at: <span>18.12.2022</span></div>
                    <Link to="/profile">Ordered by: <span>Magda gessler</span></Link>
                    <div className="delivery">Delivery: <span>Inpost 15.00 zł</span></div>
                  </div>
                  <button className='styledButton'>Manage</button>
            </div>
         </div>
    </div>
  )
}

export default Messages