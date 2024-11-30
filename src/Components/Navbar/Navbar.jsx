import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import Userpanel from './Userpanel'
import MessageBox from '../MessageBox/MessageBox'

const Navbar = ({active, user, setUser}) => {
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)
  const logged = localStorage.getItem("logged")
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
        <ul className='flex'>
            <Link to="/"><li className={`${active == 'home' && 'active'}`}>Home</li></Link>
            <Link to="/explore"><li className={`${active == 'explore' && 'active'}`}>Explore</li></Link>
            <Link to={`${logged ? "/saved" : "/authorization"}`}><li className={`${active == 'saved' && 'active'}`}>Saved</li></Link>
                <Link to={`${logged ? "/messages" : "/authorization"}`}><li className={`${active == 'messages' && 'active'}`}>
                Messages
                </li></Link>
            <li onClick={()=>{handleContactUs()}}>Contact us</li>
        </ul>
        {logged ? (
                        <>
                            <div className={`${active == 'profile filled' && 'active'} flex profile-container`} onClick={()=>setClicked(!clicked)}>
                                <span className="material-symbols-outlined">person</span>{user.name} {user.lastName}
                                <Link to={`${logged ? "/shopping-cart" : "/authorization"}`} className='cart flex'>
                                    <span className="material-symbols-outlined">shopping_cart</span> Cart
                                </Link>
                            </div>
                            {clicked && <Userpanel setClicked={setClicked} user={user} setUser={setUser}/>}
                        </>
                        ) : (
                        <Link to="/authorization" className='flex'>
                             <div className='flex profile-container' onClick={()=>setClicked(!clicked)}>
                                <span className="material-symbols-outlined">person</span>Profile
                                <Link to={`${logged ? "/shopping-cart" : "/authorization"}`} className='cart flex'>
                                    <span className="material-symbols-outlined">shopping_cart</span> Cart
                                </Link>
                            </div>
                        </Link>
        )}
    </nav>
  )
}

export default Navbar