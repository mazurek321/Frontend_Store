import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import "./Explore.css";
import Navbar from '../../Navbar/Navbar';
import Header from '../../Header/Header';
import Announcement from '../Announcement/Announcement';

const Explore = ({ user }) => {
    const [checked, setChecked] = useState("All");
    const [items, setItems] = useState([]); 
    const [visibleItems, setVisibleItems] = useState(12);

    const listOfCategories = ["All", "Ski Apparel", "Ski & Snowboard Gear", "Safety Gear", "Travel & Storage", "Maintenance & Accessories"];

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

    const filteredItems = items.filter(item => {
        if (checked === "All") return true;
        return item.item.categories.includes(checked);
    });

    const handleLoadMore = () => {
        setVisibleItems(prev => prev + 12);
    };

    const displayListOfCategories = () => {
        return listOfCategories.map(category => (
            <span 
                key={category} 
                onClick={() => setChecked(category)} 
                className={`${checked === category && 'active'}`} 
            >
                {category}
            </span>
        ));
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className='explore'>
            <Navbar active={"explore"} user={user} />

            <div className="main container">
                <div className="top flex">
                    {displayListOfCategories()}
                </div>
            </div>

            <h3 className='section-header headerContainer flex'>
                {checked} 
                <div className="returnToTop" onClick={scrollToTop}>
                    <span className="material-symbols-outlined icon">arrow_upward</span>
                </div>
            </h3>

            <div className="items flex container">
                {filteredItems.slice(0, visibleItems).length > 0 ? (
                    filteredItems.slice(0, visibleItems).map(item => (
                        <Announcement key={item.id} item={item} />
                    ))
                ) : (
                    <p>No items found for this category.</p>
                )}
            </div>

            {filteredItems.length > visibleItems && (
                <div className="button">
                    <button className='styledButton' onClick={handleLoadMore}>Load more</button>
                </div>
            )}
        </div>
    );
};

export default Explore;
