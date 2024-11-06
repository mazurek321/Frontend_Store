import React, { useRef, useState } from 'react'
import "./LatestAdded.css"
import headphones from "../../../assets/sluchawki.webp"
import { Link } from 'react-router-dom'

const LatestAdded = () => {
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(null)
  const [amount, setAmount] = useState(1)
  const amountRef = useRef()

  const displayRating = () => {
    const rating = 4
    return Array.from({length: rating}, (_, i)=>(
      <span className="material-symbols-outlined star filled" key={i}>grade</span>
    ))
  }
  
  const displayColors = () => {
    const colors = ["red", "blue", "green"]
  
    return Array.from({length: colors.length}, (_, i)=>(
      <span className={`color ${i} ${color == i && 'active'}`}  key={i}  style={{background: colors[i]}} onClick={()=>{handleColorSelection(i)}}></span>
    ))
  }
  
  const displaySizes = () => {
    const sizes = ["XS", "M", "XL"]
  
    return Array.from({length: sizes.length}, (_, i)=>(
      <span className={`size ${i} ${size == i && 'active'}`}  key={i} onClick={()=>{handleSizeSelection(i)}}>{sizes[i]}</span>
    ))
  }

  const handleColorSelection = (color) => {
    setColor(color)
  }

  const handleSizeSelection = (size) => {
    setSize(size)
  }

  const handleInputChange = (value) => {
    setAmount(value)
  }

  const handleAmountChange = (command) => {
    if(command == 1)
    {
      if(amount <= 1) return;
      var value = amount-1
      setAmount(value)
    }else
    {
      if(amount >= 100) return;
      var value = amount+1
      setAmount(value)
    }
  }

  return (
    <div className='latest-added'>
        <div className="header">Latest added item</div>
        <p>Headphones</p>
        <div className="panel">
            <Link to="/">
              <div className="image">
                  <img src={headphones} alt="headphones by magda g" />
              </div>
            </Link>
            <div className="description">
            <Link to="">
                <h3 className='flex header'>Headphones <Link to=""><p>By <span>Magda Gessler</span></p></Link></h3>
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
                <div className="colors_amount flex">
                  <div className="values flex">
                    <div className="colors flex">
                      <span>Colors: </span>
                      {displayColors()}
                    </div>

                    <div className="sizes flex">
                      <span>Sizes: </span>
                      {displaySizes()}
                    </div>
                  </div>

                  <div className="amount flex">
                      <button className="decrease" onClick={()=>{handleAmountChange(1)}}>-</button>
                      <input 
                        type="number" 
                        className="value" 
                        value={amount} 
                        ref={amountRef} 
                        onChange={value=>{handleInputChange(value)}}
                      />
                      <button className="increase" onClick={()=>{handleAmountChange(2)}}>+</button>
                  </div>
                </div>

                <div className="bottom flex">
                    <button><span className="material-symbols-outlined">favorite</span></button>
                    <button><span className="material-symbols-outlined">shopping_cart</span>Add to cart</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default LatestAdded