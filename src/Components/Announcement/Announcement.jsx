import React, { useState } from 'react'
import "./Announcement.css"
import Navbar from '../Navbar/Navbar'
import headphones from "../../assets/sluchawki.webp"
import { Link } from 'react-router-dom'


const Announcement = () => {

    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)
    const [amount, setAmount] = useState(1)
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0) 

    const handleMouseEnter = (i) => {
        setHoverRating(i + 1) 
    }

    const handleMouseLeave = () => {
        setHoverRating(0)  
    }
    

    const displayInputRating = () => {
        const totalStars = 5
        return Array.from({ length: totalStars }, (_, i) => (
            <span
                className="material-symbols-outlined star"
                key={i}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onClick={() => setRating(i + 1)}
                style={{
                    color: hoverRating > i || rating > i ? 'orange' : 'gray'
                }}
            >
                grade
            </span>
        ))
    }

    const displayRating = () => {
        const rating = 4
        return Array.from({length: rating}, (_, i)=>(
            <span className="material-symbols-outlined star filled" key={i}>grade</span>
        ))
    }

    const displayColors = () => {
        const colors = ["red", "blue", "green"]
        return Array.from({ length: colors.length }, (_, i) => (
            <span
                className={`color ${i} ${color === i && 'active'}`}
                key={i}
                style={{ background: colors[i] }}
                onClick={() => setColor(i)}
            ></span>
        ))
    }

    const displaySizes = () => {
        const sizes = ["XS", "M", "XL"]
        return Array.from({ length: sizes.length }, (_, i) => (
            <span
                className={`size ${i} ${size === i && 'active'}`}
                key={i}
                onClick={() => setSize(i)}
            >
                {sizes[i]}
            </span>
        ))
    }

    const handleAmountChange = (command) => {
        if (command === 1) {
            if (amount <= 1) return
            setAmount(amount - 1)
        } else {
            if (amount >= 100) return
            setAmount(amount + 1)
        }
    }

    return (
        <div className='announcement'>
            <Navbar active={"home"} />
            <div className="ann">
                <div className="top flex">
                    <div className="image">
                        <img src={headphones} alt="Headphones" />
                    </div>
                    <div className="panel">
                        <h3 className='flex'>Headphones <p>Added by: <Link to="/profile"><span> Magda Gessler</span></Link></p></h3>

                        <div className="rating flex">
                            {displayRating()}
                            <span className='reviews'>(200+ reviews)</span>
                        </div>

                        <div className="user-panel">
                            <div className="colors flex">
                                <span>Colors: </span>
                                {displayColors()}
                            </div>

                            <div className="sizes flex">
                                <span>Sizes: </span>
                                {displaySizes()}
                            </div>

                            <div className="amount flex">
                                <span>Amount: </span>
                                <div className="amount-value">
                                    <button className="decrease" onClick={() => handleAmountChange(1)}>-</button>
                                    <input
                                        type="number"
                                        className="value"
                                        value={amount}
                                        onChange={e => setAmount(Number(e.target.value))}
                                    />
                                    <button className="increase" onClick={() => handleAmountChange(2)}>+</button>
                                </div>
                            </div>
                            <div className="add-to-cart flex">
                                <button className='styledButton'>Buy now</button>
                                <button className='styledButton'>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="description">
                    <h3>Description</h3>
                    <p>
                        Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                        Jakis opis sluchawek nie wiem, z sie fajnie nimi rzuca w monitor jak sie przegra w sismy xD.
                    </p>
                </div>
            </div>

            <div className="reviews-container">
                <h3>Reviews</h3>
                <div className="reviews-user">
                    <div className="review-of-user">
                        <h4>Add review</h4>
                        <textarea name="review" rows={3}></textarea>
                        <div className="button flex">
                            <div className="rating">
                                {displayInputRating()}
                            </div>
                            <button className='styledButton'>Add review</button>
                        </div>
                    </div>

                    <div className="review-of-user">
                        <div className="user flex">
                            <div className="value flex">
                                Magda Gessler
                                <div className="my-review">
                                    <button className='styledButton'>Delete</button>
                                </div>
                            </div>
                            <span className='rating'>{displayRating()}</span>
                        </div>
                        <div className="content">
                            Jakis gowno itemek. nie polecam. Rzucam talerzem w niego. Zbilam monitor.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Announcement
