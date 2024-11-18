import React from 'react'
import "./MyAnnouncements.css"
import headphones from "../../assets/sluchawki.webp"
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'

const MyAnnouncements = () => {

    const displayRating = () => {
        const rating = 4
        return Array.from({length: rating}, (_, i)=>(
            <span className="material-symbols-outlined star filled" key={i}>grade</span>
        ))
    }


  return (
    <div className='my-announcements'>
        <Navbar active={"profile"}/>

        <div className="my-announcements-container container">
            <Header text="My announcements" icons={true}/>

            <div className="announcements flex">
            <Link to="/announcement">
              <div className="image">
                  <img src={headphones}/>
              </div>
            </Link>
            <div className="description">
            <Link to="/announcement">
                <h3 className='flex header'>Headphones</h3>
            </Link>
                <div className="rating flex">
                  {displayRating()}
                  <span className='reviews'>(200+ reviews)</span>
                </div>
                <p className='itemDescription'>
                  Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                  Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                  Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                  Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                  Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                </p>
                <p className='price'>Cena: <span>259.89 zł</span></p>
                <Link to="/announcement"><button className='styledButton'>Manage</button></Link>
            </div>
          </div>




          <div className="announcements flex">
            <Link to="/announcement">
              <div className="image">
                  <img src={headphones}/>
              </div>
            </Link>
            <div className="description">
            <Link to="/announcement">
                <h3 className='flex header'>Headphones</h3>
            </Link>
                <div className="rating flex">
                  {displayRating()}
                  <span className='reviews'>(200+ reviews)</span>
                </div>
                <p className='itemDescription'>
                  Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                  Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                  Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                  Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                  Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                </p>
                <p className='price'>Cena: <span>259.89 zł</span></p>
                <Link to="/announcement"><button className='styledButton'>Manage</button></Link>
            </div>
          </div>      
        </div>
    </div>
  )
}

export default MyAnnouncements