import React, { useState, useEffect } from 'react';
import "./Announcement.css";
import img from "../../../assets/sluchawki.webp";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Announcement = ({ item }) => {
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [amount, setAmount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`http://localhost:5050/SavedAnnouncements?announcementId=${item.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.isSaved) {
            setIsFavorite(true);
          }
        } catch (error) {
          console.error('Error checking favorite status:', error);
        }
      }
    };
    checkIfFavorite();
  }, [item.id]);

  const displayRating = () => {
    const rating = 4;
    return Array.from({ length: rating }, (_, i) => (
      <span className="material-symbols-outlined star filled" key={i}>grade</span>
    ));
  };

  const displayColors = () => {
    const colors = Object.keys(item.colorsAmount || {});
    return colors.map((colorName, index) => (
      <span
        key={index}
        className={`color ${colorName} ${color === colorName ? 'active' : ''}`}
        style={{ background: colorName }}
        onClick={() => setColor(colorName)}
      ></span>
    ));
  };

  const displaySizes = () => {
    const sizes = Object.keys(item.colorsSizesAmounts?.[color] || {});
    return sizes.map((sizeOption, index) => (
      <span
        key={index}
        className={`size ${sizeOption} ${size === sizeOption ? 'active' : ''}`}
        onClick={() => setSize(sizeOption)}
      >
        {sizeOption}
      </span>
    ));
  };

  const handleFavoriteClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to save this item');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5050/SavedAnnouncements?announcementId=${item.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error saving to favorites:', error);
    }
  };

  return (
    <div className={`announcement ${isFavorite ? 'isInSaved' : ''}`}>
      <div className="top flex">
        <button className={`favorite flex ${isFavorite ? 'isInSaved' : ''}`} onClick={handleFavoriteClick}>
          <span className="material-symbols-outlined icon">
            {isFavorite ? 'favorite' : 'favorite_border'}
          </span>
        </button>
        {/* <div className="rating">
          {displayRating()}
        </div> */}
      </div>

      <div className="image flex">
        <img src={img} alt="item" />
      </div>

      <h5>{item.item.title}</h5>

      <div className="price">
        <span>{item.item.cost.value} zł</span>
      </div>

      <div className="colors">
        {displayColors()}
      </div>

      <div className="sizes">
        {color && displaySizes()}
      </div>

      <div className="button">
        <Link to={`/announcement?announcementId=${item.id}`}>
          <button className='styledButton'>View more</button>
        </Link>
      </div>
    </div>
  );
};

export default Announcement;
