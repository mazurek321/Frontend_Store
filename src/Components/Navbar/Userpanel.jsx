import React, {useRef} from 'react'
import "./Userpanel.css"
import { Link } from 'react-router-dom'

const Userpanel = ({setClicked, user, setUser}) => {
  const box = useRef()

  const handleClick = (e) => {
    (box.current && !box.current.contains(e.target)) && setClicked(false)
  }

  return (
    <div className='userpanel' onClick={(e)=>handleClick(e)}>
      <div className="box" ref={box}>
        <ul>
              <Link to="/profile">
                  <li className='user-name'>
                      <span>{user.name} {user.lastName}</span>
                      <span className='email'>{user.email}</span>
                  </li>
              </Link>
              <Link to="/profile"><li><span className="material-symbols-outlined">person</span>Profile</li></Link>
              <Link to="/shopping-cart"><li><span className="material-symbols-outlined">shopping_cart</span>Cart</li></Link>
              <Link to="/saved"><li><span className="material-symbols-outlined">favorite</span>Saved</li></Link>
              <Link to="/my-orders"><li><span className="material-symbols-outlined">local_shipping</span>My orders</li></Link>
              <Link to="/my-announcements"><li><span className="material-symbols-outlined">tooltip_2</span>My Announcements</li></Link>
              <Link to="/messages"><li><span className="material-symbols-outlined">orders</span>Messages</li></Link>
              <Link to="/profile/settings"><li><span className="material-symbols-outlined">settings</span>Settings</li></Link>
              <Link to="/logout"><li className='logout'><span className="material-symbols-outlined">logout</span>Logout</li></Link>
          </ul>
      </div>
    </div>
  )
}

export default Userpanel