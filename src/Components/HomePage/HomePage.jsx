import React, { useEffect, useState } from 'react';
import "./HomePage.css";
import Navbar from '../Navbar/Navbar';
import Baner from '../Baner/Baner';
import Announcement from './Announcement/Announcement';
import Footer from '../Footer/Footer';

const HomePage = () => {
  const [slide, setSlide] = useState(0);
  const [mouseOverLeft, setMouseOverLeft] = useState(false);
  const [mouseOverRight, setMouseOverRight] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const itemWidth = 288;
  const speed = 500;
  const numItems = 15; 
  const maxSlide = -(itemWidth * (numItems - 2));

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

  return (
    <div className='homePage'>
      <Navbar active={"home"} />
      <Baner />
      <h3 className='section-header headerContainer flex'>
        Latest added items
      </h3>
      <div className="section container flex last-added">
        <Announcement />
        <Announcement />
        <Announcement />
        <Announcement />
      </div>

      <h3 className='section-header headerContainer flex'>
        Snowboard
        <span className="material-symbols-outlined icon">arrow_forward_ios</span>
      </h3>
      <div className="section container flex">
        <div className="arrows flex">
          <div
            className="left"
            onMouseEnter={() => setMouseOverLeft(true)}
            onMouseLeave={() => setMouseOverLeft(false)}
            style={{opacity: slide < 0 ? 1 : 0}}
          >
          </div>
          <div
            className="right"
            onMouseEnter={() => setMouseOverRight(true)}
            onMouseLeave={() => setMouseOverRight(false)}
          >
          </div>
        </div>
        <div className="items flex container" style={{ transform: `translateX(${slide}px)` }}>
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
        </div>
      </div>





      <h3 className='section-header headerContainer flex'>
        Gloves
        <span className="material-symbols-outlined icon">arrow_forward_ios</span>
      </h3>
      <div className="section container flex">
        <div className="arrows flex">
          <div
            className="left"
            onMouseEnter={() => setMouseOverLeft(true)}
            onMouseLeave={() => setMouseOverLeft(false)}
            style={{opacity: slide < 0 ? 1 : 0}}
          >
          </div>
          <div
            className="right"
            onMouseEnter={() => setMouseOverRight(true)}
            onMouseLeave={() => setMouseOverRight(false)}
          >
          </div>
        </div>
        <div className="items flex container" style={{ transform: `translateX(${slide}px)` }}>
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
          <Announcement />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
