import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./HomePage.css";
import Navbar from '../Navbar/Navbar';
import Baner from '../Baner/Baner';
import Announcement from './Announcement/Announcement';
import Footer from '../Footer/Footer';

const HomePage = ({ user }) => {
  const [slide, setSlide] = useState(0);
  const [mouseOverLeft, setMouseOverLeft] = useState(false);
  const [mouseOverRight, setMouseOverRight] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [items, setItems] = useState([]);
  const itemWidth = 288;
  const speed = 500;
  const numItems = 15;
  const maxSlide = -(itemWidth * (numItems - 2));

  const listOfCategories = [
    "Ski Apparel", 
    "Ski & Snowboard Gear", 
    "Safety Gear", 
    "Travel & Storage", 
    "Maintenance & Accessories"
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5050/Announcement');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const latestItems = items
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const handleSlideRight = () => {
    if (slide > maxSlide) {
      setSlide((prev) => prev - itemWidth);
    }
  };

  const handleSlideLeft = () => {
    if (slide < 0) {
      setSlide((prev) => prev + itemWidth);
    }
  };

  useEffect(() => {
    if (mouseOverLeft && slide < 0) {
      const id = setInterval(handleSlideLeft, speed);
      setIntervalId(id);
    } else if (mouseOverRight && slide > maxSlide) {
      const id = setInterval(handleSlideRight, speed);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [mouseOverLeft, mouseOverRight, slide]);

  const displayListOfCategories = () => {
    return listOfCategories.map((category, index) => (
      <React.Fragment key={index}>
        <h3 className='section-header headerContainer flex'>
          {category}
          <span className="material-symbols-outlined icon">arrow_forward_ios</span>
        </h3>
        <div className="section container flex">
          <div className="arrows flex">
            <div
              className="left"
              onMouseEnter={() => setMouseOverLeft(true)}
              onMouseLeave={() => setMouseOverLeft(false)}
              style={{ opacity: slide < 0 ? 1 : 0 }}
            ></div>
            <div
              className="right"
              onMouseEnter={() => setMouseOverRight(true)}
              onMouseLeave={() => setMouseOverRight(false)}
            ></div>
          </div>
          
          <div className="items flex container" style={{ transform: `translateX(${slide}px)` }}>
            {items.length > 0 ? (
              items
                .filter(item => item.item.categories.includes(category))
                .map(item => (
                  <Announcement key={item.id} item={item} />
                ))
            ) : (
              <p>No items found</p>
            )}
          </div>
        </div>
      </React.Fragment>
    ));
  };

  return (
    <div className='homePage'>
      <Navbar active={"home"} user={user} />
      <Baner />
      <h3 className='section-header headerContainer flex'>
        Latest added items
      </h3>
      <div className="section container flex last-added">
        {latestItems.length > 0 ? (
          latestItems.map(item => (
            <Announcement key={item.id} item={item} />
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>

      {displayListOfCategories()}

      <Footer />
    </div>
  );
};

export default HomePage;
