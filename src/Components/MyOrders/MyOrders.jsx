import React from 'react'
import "./MyOrders.css"
import headphones from "../../assets/sluchawki.webp"
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'

const MyOrders = () => {
  return (
    <div className='my-orders'>
        <Navbar active={"profile"}/>
        <div className="my-orders-container container">

            <Header text="My orders" icons={true}/>

            <div className="order flex">
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
                        <div className="delivery">Delivery: <span>Inpost 15.00 zł</span></div>
                    </div>
                    <div className="statusDiv">
                        <p>Status: <span className='status pending'>Pending...</span></p>
                    </div>
            </div>



            <div className="order flex">
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
                        <div className="delivery">Delivery: <span>Inpost 15.00 zł</span></div>
                    </div>
                    <div className="statusDiv">
                        <p>Status: <span className='status pending'>Pending...</span></p>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default MyOrders