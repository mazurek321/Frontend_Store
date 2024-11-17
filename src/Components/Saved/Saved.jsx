import React from 'react'
import "./Saved.css"
import Navbar from '../Navbar/Navbar'
import Item from '../Cart/Item'

const Saved = () => {
  return (
    <div className='saved'>
        <Navbar active={"saved"}/>
        <div className="saved-container container">
            <h3>Saved announcements</h3>
            <Item/>  
            <Item/>
        </div>
    </div>
  )
}

export default Saved