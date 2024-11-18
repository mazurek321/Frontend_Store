import React from 'react'
import "./Cart.css"
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import headphones from "../../assets/sluchawki.webp"


const Cart = () => {

    var cartList = []

  return (
    <div className='cart'>
        <Navbar active={"cart"}/>
        <div className="container">

            <Header text="Shopping cart"/>
            
            <div className="item flex">
                <div className="buttons flex">
                <button className='favorite'><span className="material-symbols-outlined">favorite</span></button>
                <button className='delete'><span className="material-symbols-outlined">delete</span></button>
            </div>
              <Link to="/" className='flex'>
                  <div className="image">
                      <img src={headphones} alt="headphones" />
                  </div>
                  <div className="description">
                      <h4>Headphones</h4>
                      <p>Cena: <span>239.99 zł</span></p>
                      <div className="size-color flex">
                          <p>Color: <span>red</span></p>
                          <p>Size: <span>S</span></p>
                      </div>
                  </div>
              </Link>
              <div className="amount flex">
                <button className='decrease'>-</button>
                <input type="number" value={1}/>
                <button className='increase'>+</button>
              </div>
            </div>



            <div className="item flex">
                <div className="buttons flex">
                <button className='favorite'><span className="material-symbols-outlined">favorite</span></button>
                <button className='delete'><span className="material-symbols-outlined">delete</span></button>
            </div>
              <Link to="/" className='flex'>
                  <div className="image">
                      <img src={headphones} alt="headphones" />
                  </div>
                  <div className="description">
                      <h4>Headphones</h4>
                      <p>Cena: <span>239.99 zł</span></p>
                      <div className="size-color flex">
                          <p>Color: <span>red</span></p>
                          <p>Size: <span>S</span></p>
                      </div>
                  </div>
              </Link>
              <div className="amount flex">
                <button className='decrease'>-</button>
                <input type="number" value={1}/>
                <button className='increase'>+</button>
              </div>
            </div>
            

            <div className="sum">
              <h4>Items in cart: <span>2</span></h4>
              <h4>Total: <span>200000 zł</span></h4>
              <select>
                <option value="default" selected disabled>Select shipment option</option>
                <option value="inpost">Inpost <span>10 zł</span></option>
                <option value="dpd">Dpd <span>9.99 zł</span></option>
              </select>
              <button className='styledButton'>Order</button>
            </div>
        </div>
    </div>
  )
}

export default Cart