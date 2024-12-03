import React, { useEffect, useState } from 'react';
import "./Announcement.css";
import Navbar from '../Navbar/Navbar';
import headphones from "../../assets/sluchawki.webp";
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import MessageBox from '../MessageBox/MessageBox';

const Announcement = ({ user }) => {
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [amount, setAmount] = useState(1);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const location = useLocation();
    const [id, setId] = useState(null);
    const [announcement, setAnnouncement] = useState(null);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("Error");
    const [action, setAction] = useState("cancel");
    const [reviews, setReviews] = useState([]); 
    const [comment, setComment] = useState('');
    const [userEmails, setUserEmails] = useState({}); 
    let timer;

    useEffect(() => {
        timer = setTimeout(() => {
            setVisible(false);
        }, 6000);
        return () => {
            clearTimeout(timer);
        };
    }, [visible]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('announcementId');
        setId(id);
        if (id) {
            axios.get(`http://localhost:5050/Announcement?announcementId=${id}`)
                .then(response => {
                    setAnnouncement(response.data);
                })
                .catch(error => console.error(error));

            axios.get(`http://localhost:5050/Reviews?announcementId=${id}`)
                .then(response => {
                    setReviews(response.data);
                    response.data.forEach(review => {
                        if (review.ownerId && review.ownerId.value) {
                            fetchUserEmail(review.ownerId.value);
                        }
                    });
                })
                .catch(error => console.error(error));
        }
    }, [location.search]);

    const getAvailableStock = () => {
    if (color && size && announcement[0]?.item?.colorsSizesAmounts) {
        return announcement[0].item.colorsSizesAmounts[color]?.[size] || 0;
    } else if (color && announcement[0]?.item?.colorsAmount) {
        return announcement[0].item.colorsAmount[color] || 0;
    } else if (announcement[0]?.item?.amount) {
        return announcement[0].item.amount; 
    }
    return 0;
};

    const handleFavoriteClick = async (itemId) => {
        const token = localStorage.getItem('token');
        if (!token) {
        alert('You must be logged in to save this item');
        return;
        }

        try {
            const response = await axios.post(`http://localhost:5050/SavedAnnouncements?announcementId=${itemId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error saving to favorites:', error.response);
        }
    };
    

    const fetchUserEmail = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5050/Users/user?userId=${userId}`);
            setUserEmails(prevState => ({
                ...prevState,
                [userId]: response.data.email.value, 
            }));
        } catch (error) {
            console.error('Error fetching user email:', error);
        }
    };

    const handleMouseEnter = (i) => setHoverRating(i + 1);
    const handleMouseLeave = () => setHoverRating(0);

    const displayInputRating = () => {
        const totalStars = 5;
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
        ));
    };

    const displayRating = (value) => {
        const rating = value;
        return Array.from({ length: rating }, (_, i) => (
            <span className="material-symbols-outlined star filled" key={i}>grade</span>
        ));
    };

    const displayColorAndSizes = () => {
        if (announcement[0]?.item?.colorsSizesAmounts) {
            return (
                <div className="color-size-amounts">
                    <h4>Choose Color:</h4>
                    <div className="color-options">
                        {Object.keys(announcement[0].item.colorsSizesAmounts).map((availableColor) => {
                            const totalAmount = Object.values(announcement[0].item.colorsSizesAmounts[availableColor])
                                .reduce((sum, sizeAmount) => sum + sizeAmount, 0); 
                            const isColorAvailable = totalAmount > 0;
    
                            return (
                                <button
                                    key={availableColor}
                                    className={`option-button ${color === availableColor ? 'selected' : ''}`}
                                    onClick={() => isColorAvailable && setColor(availableColor)}
                                    disabled={!isColorAvailable}
                                    style={{ opacity: !isColorAvailable ? 0.5 : 1 }}
                                >
                                    {availableColor} ({totalAmount})
                                </button>
                            );
                        })}
                    </div>
    
                    {color && (
                        <>
                            <h4>Choose Size:</h4>
                            <div className="size-options">
                                {Object.keys(announcement[0].item.colorsSizesAmounts[color]).map((availableSize) => {
                                    const sizeAmount = announcement[0].item.colorsSizesAmounts[color][availableSize];
                                    const isSizeAvailable = sizeAmount > 0;
    
                                    return (
                                        <button
                                            key={availableSize}
                                            className={`option-button ${size === availableSize ? 'selected' : ''}`}
                                            onClick={() => isSizeAvailable && setSize(availableSize)}
                                            disabled={!isSizeAvailable}
                                            style={{ opacity: !isSizeAvailable ? 0.5 : 1 }}
                                        >
                                            {availableSize} ({sizeAmount})
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            );
        } else if (announcement[0]?.item?.colorsAmount) {
            return (
                <div className="color-amounts">
                    <h4>Choose Color:</h4>
                    <div className="color-options">
                        {Object.keys(announcement[0].item.colorsAmount).map((availableColor) => {
                            const colorAmount = announcement[0].item.colorsAmount[availableColor];
                            const isColorAvailable = colorAmount > 0;
    
                            return (
                                <button
                                    key={availableColor}
                                    className={`option-button ${color === availableColor ? 'selected' : ''}`}
                                    onClick={() => isColorAvailable && setColor(availableColor)}
                                    disabled={!isColorAvailable}
                                    style={{ opacity: !isColorAvailable ? 0.5 : 1 }}
                                >
                                    {availableColor} ({colorAmount})
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        } else if (announcement[0]?.item?.amount.value) {
            return (
                <div className="amount-only">
                    <h4>Item Quantity:</h4>
                    <p>Available stock: {announcement[0]?.item?.amount.value}</p>
                </div>
            );
        } else {
            return <p>No stock available for this item.</p>;
        }
    };
    
    

    const handleAmountChange = (command) => {
        const maxStock = getAvailableStock();
    
        if (command === 1) {
            if (amount <= 1) return;
            setAmount(amount - 1);
        } else {
            if (amount >= maxStock) return;
            setAmount(amount + 1);
        }
    };
    
    

    const handleAddToCart = async () => {
        const needsSize = !!announcement[0]?.item?.colorsSizesAmounts;
        const needsColor = !!announcement[0]?.item?.colorsAmount || !!announcement[0]?.item?.colorsSizesAmounts;

        if ((needsSize && !size) || (needsColor && !color)) {
            setAction("cancel");
            setMessage("You need to choose all required options.");
            setVisible(true);
            return;
        }

        if (amount <= 0) {
            setAction("cancel");
            setMessage("Quantity must be greater than zero.");
            setVisible(true);
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5050/ShoppingCart?AnnouncementId=${id}`,
                {
                    quantity: amount,
                    selectedColor: color || null,
                    selectedSize: size || null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setAction("success");
            setMessage("Added to cart");
            setVisible(true);
            console.log("Item added to cart successfully:", response.data);
        } catch (error) {
            setAction("cancel");
            setMessage("Error while adding to cart.");
            setVisible(true);
            console.error("Error adding to cart:", error.response?.data || error.message);
        }
    };

    const handleSubmitReview = async () => {
        if (rating === 0) {
            setAction("cancel");
            setMessage("Please provide a rating.");
            setVisible(true);
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5050/Reviews?announcementId=${id}`,
                {
                    comment: comment || null,
                    rating: rating,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setAction("success");
            setMessage("Review submitted successfully!");
            setVisible(true);
            setReviews([...reviews, response.data]); 
            setComment(''); 
            setRating(0);   
        } catch (error) {
            setAction("cancel");
            setMessage("You have already given a review to this announcement.");
            setVisible(true);
            console.error("Error submitting review:", error.response?.data || error.message);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:5050/Reviews?reviewId=${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            setAction("success");
            setMessage("Review deleted successfully.");
            setVisible(true);
            setReviews(reviews.filter(review => review.id !== reviewId)); 
        } catch (error) {
            setAction("cancel");
            setMessage("Error while deleting review.");
            setVisible(true);
            console.error("Error deleting review:", error.response?.data || error.message);
        }
    };
    

    if (!announcement) {
        return <div>Loading...</div>;
    }

    return (
        <div className='main-announcement'>
            <Navbar active={"home"} user={user} />

            <div className="ann container">
                {visible && <MessageBox action={action} message={message} />}
                <div className="top flex">
                    <div className="image">
                        <img src={headphones} alt="Headphones" />
                    </div>

                    <div className="panel">
                        <h3 className='flex'>{announcement[0].item.title}</h3>
                        <button className='favorite'>
                            <span className="material-symbols-outlined" onClick={() => handleFavoriteClick(announcement[0].id)}>favorite</span>
                        </button>

                        <div className="description">
                            <h3>Description</h3>
                            <p>{announcement[0]?.item?.description}</p>
                        </div>

                        <div className="price">
                            <h3>Price</h3>
                            <p>{announcement[0]?.item?.cost.value} zł</p>
                        </div>

                        <div className="user-panel">
                            <div className="colors-sizes">
                                {displayColorAndSizes()}
                            </div>

                            <div className="amount flex">
                        <span>Amount: </span>
                        <div className="amount-value">
                            <button className="decrease" onClick={() => handleAmountChange(1)}>-</button>
                            <input
                                type="number"
                                className="value"
                                value={amount}
                                onChange={e => {
                                    const value = Math.min(Number(e.target.value), getAvailableStock());
                                    setAmount(value > 0 ? value : 1);
                                }}
                            />
                            <button className="increase" onClick={() => handleAmountChange(2)}>+</button>
                        </div>
                    </div>

                            <div className="add-to-cart flex">
                                <button className='styledButton' onClick={handleAddToCart}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="reviews-container container">
                <Header text="Reviews" />
                <div className="reviews-user">
                    <div className="review-of-user">
                        <h4>Add review</h4>
                        <textarea
                            name="review"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="button flex">
                            <div className="rating">
                                {displayInputRating()}
                            </div>
                            <button className='styledButton' onClick={handleSubmitReview}>Add review</button>
                        </div>
                    </div>

                    {reviews.map((review) => (
                        <div key={review.id} className="review-of-user">
                            <div className="user flex">
                                <div className="value flex">
                                    {userEmails[review.ownerId.value] || 'Loading...'}
                                    {user.id === review.ownerId.value && (
                                        <button
                                            className='styledButton'
                                            onClick={() => handleDeleteReview(review.id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                                <span className='rating'>{displayRating(review.rating.value)}</span>
                            </div>
                            <div className="content">
                                {review.comment}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Announcement;
