import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
        <div className="top flex container">
            <div className="left">
                left
            </div>
            <div className="middle">
                middle
            </div>
            <div className="right">
                right
            </div>
        </div>
        <div className="bottom container">
            &copy; Bartłomiej Mazurkiewicz 2024
        </div>
    </div>
  )
}

export default Footer