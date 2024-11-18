import React, { useRef, useState } from 'react'
import "./Announcement.css"
import img from "../../../assets/sluchawki.webp"

const Announcement = () => {
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
    <div className='announcement'>

      <div className="top flex">
        <button className='favorite flex'><span className="material-symbols-outlined">favorite</span></button>
        <div className="rating">
          {displayRating()}
        </div>
      </div>

        <div className="image flex">
          <span className="material-symbols-outlined slideLeft arrow">arrow_back_ios</span>
          <img src={img} />
          <span className="material-symbols-outlined slideRight arrow">arrow_forward_ios</span>
        </div>

        <h5>Strój narciarski</h5>

        <div className="price">
          <span>299.99 zł</span>
        </div>

        <div className="colors flex">
          {displayColors()}
        </div>
        <div className="sizes flex">
          {displaySizes()}
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

          <div className="button">
            <button className='styledButton'>Add to cart</button>
          </div>
    </div>
  )
}

export default Announcement