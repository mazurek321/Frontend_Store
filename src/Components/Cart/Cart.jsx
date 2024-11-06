import React from 'react'
import "./Cart.css"
import Navbar from '../Navbar/Navbar'
import Item from './Item'
import { Link } from 'react-router-dom'

const Cart = () => {

    var cartList = []

  return (
    <div className='cart'>
        <Navbar active={"cart"}/>
        <div className="cart-container main">
            <h3>Shopping cart</h3>
            <Item cart={true}/>  
            <Item cart={true}/>   
            <div className="sum">
               <h4>Items in cart: <span>4</span></h4>
               <h4>Total: <span>1245 zł</span></h4>
               <Link to="/order"><button className='styledButton'>Order</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Cart