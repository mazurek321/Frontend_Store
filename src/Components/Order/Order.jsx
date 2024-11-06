import React from 'react'
import "./Order.css"
import Navbar from '../Navbar/Navbar'
import Userinfo from '../Userprofile/Userinfo/Userinfo'

const Order = () => {
  return (
    <div className='order'>
        <Navbar active={"cart"}/>
        <div className="order-container main">
            <h3>Finishing order</h3>
            <Userinfo/>

            <h3>Select shipment</h3>
            <div className="shipment">
                <select>
                    <option disabled className='choose' selected="selected">Select shipment</option>
                    <option value="inpost">Inpost <span>15 zł</span></option>
                    <option value="dpd">Dpd <span>9.99 zł</span></option>
                </select>
            </div>

            <h3>Summary</h3>
            <div className="summary">
                <p>Total: <span>1245 zł</span></p>
            </div>
            <button className='styledButton'>Order</button>
        </div>
    </div>
  )
}

export default Order