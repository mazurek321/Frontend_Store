import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
        <div className="top flex">
            <div className="left">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10252.660376598025!2d21.976976098714655!3d50.02700221290877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfbaefe222183%3A0x6a590633671c25c4!2sWydzia%C5%82%20Elektrotechniki%20i%20Informatyki%20Politechniki%20Rzeszowskiej!5e0!3m2!1spl!2spl!4v1731877700186!5m2!1spl!2spl" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            <div className="middle">
                <p>
                    <h3>Adres</h3>
                    <span>Wincentego Pola 2 <br/> 35-021 Rzeszów</span>
                </p>
                <p>
                    <h3>email:</h3><span>173670@stud.prz.edu.pl</span>
                </p>
            </div>
            <div className="right">
                <ul>
                    <li><a href="https://pl-pl.facebook.com/oficjalnypolitechnikarzeszowska/about/" target='_blank'>Facebook</a></li>
                    <li><a href="https://www.instagram.com/politechnika_rzeszowska/" target='_blank'>Instagram</a></li>
                    <li><a href="https://www.youtube.com/@politechnikarzeszowska9025" target='_blank'>Youtube</a></li>
                </ul>
            </div>
        </div>
        <div className="bottom headerContainer">
            &copy; Bartłomiej Mazurkiewicz 2024
        </div>
    </div>
  )
}

export default Footer