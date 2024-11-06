import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import Userpanel from './Userpanel'
import MessageBox from '../MessageBox/MessageBox'

const Navbar = ({active}) => {
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)
  let timer;

  const handleContactUs = () => {
    if(!visible) setVisible(true)
  }

  useEffect(()=>{
    timer = setTimeout(()=>{
        setVisible(false)
    }, 6000)
    return ()=>{clearTimeout(timer)}
  }, [visible])


  return (
    <nav className='flex'>
        {visible && <MessageBox action={"info"} message={"You cannot contact us, sorry."}/>}
        <div className="logo">            
            <Link to="/" className='flex'>
                <img src={logo} alt="logo of the store" />
                <h4>SaintsRow</h4>
            </Link>   
        </div>
        <ul>
            <Link to="/"><li className={`${active == 'home' && 'active'}`}><span className="material-symbols-outlined">home</span>Home</li></Link>
            {/* <Link to="/"><li className={`${active == 'explore' && 'active'}`}><span className="material-symbols-outlined">explore</span>Explore</li></Link> */}
            <Link to="/saved"><li className={`${active == 'saved' && 'active'}`}><span className="material-symbols-outlined">favorite</span>Saved</li></Link>
            <Link to="/authorization"><li className={`${active == 'profile' && 'active'}`}><span className="material-symbols-outlined">person</span>Profile</li></Link>
            <Link to="/shopping-cart"><li className={`${active == 'cart' && 'active'}`}>
                <span className="material-symbols-outlined">shopping_cart</span>
                    Cart
                    {/* <div className="amount">0</div> */}
                </li></Link>
            <Link to="/messages"><li className={`${active == 'messages' && 'active'}`}>
                <span className="material-symbols-outlined">orders</span>Messages
                    {/* <div className="amount">0</div> */}
                </li></Link>
            <li onClick={()=>{handleContactUs()}}><span className="material-symbols-outlined">call</span>Contact us</li>
        </ul>
        <div className="top-bar">
            <ul className='flex'>
                <li className='search'>
                    <input type="text" />
                    <span className="material-symbols-outlined icon">search</span>
                </li>
                <li>
                    <Link to="/shopping-cart"><span className="material-symbols-outlined">shopping_cart</span></Link>
                </li>
                <li className='relative' onClick={()=>{setClicked(!clicked)}}>
                    <span className="material-symbols-outlined">person</span>
                </li>
                {clicked && <Userpanel setClicked={setClicked}/>}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar