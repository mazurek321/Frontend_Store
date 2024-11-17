import React from 'react'
import headphones from "../../assets/sluchawki.webp"
import { Link } from 'react-router-dom'

const Item = () => {
  return (
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
    </div>
  )
}

export default Item