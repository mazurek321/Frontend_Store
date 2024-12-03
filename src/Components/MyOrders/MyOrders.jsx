import React, { useEffect, useState } from 'react';
import "./MyOrders.css";
import headphones from "../../assets/sluchawki.webp";
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';

const MyOrders = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [visibleOrders, setVisibleOrders] = useState(10);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5050/Orders/my-orders', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const ordersData = response.data;

                const updatedOrders = await Promise.all(ordersData.map(async (order) => {
                    try {
                        const announcementResponse = await axios.get(`http://localhost:5050/Announcement?announcementId=${order.items[0].announcementId}`);
                        return { ...order, announcement: announcementResponse.data };
                    } catch (error) {
                        console.error("Error fetching announcement:", error);
                        return { ...order, announcement: null }; 
                    }
                }));

                const sortedOrders = updatedOrders.sort((a, b) => new Date(b.orderedAt) - new Date(a.orderedAt));

                setOrders(sortedOrders);  
            } catch (error) {
                console.error("Error fetching orders:", error.response);
            }
        };

        fetchOrders();
    }, []);

    const handleShowMore = () => {
        setVisibleOrders((prev) => prev + 10);
    };

    return (
        <div className='my-orders'>
            <Navbar active={"profile"} user={user} />
            <div className="my-orders-container container">
                <Header text="My orders" icons={true} />

                {orders.length > 0 ? (
                    orders.slice(0, visibleOrders).map(order => (
                        <div key={order.id} className="order flex">
                            {order.announcement && order.announcement[0] ? (
                                <Link to={`/announcement?announcementId=${order.announcement[0].id}`} className='flex'>
                                    <div className="image">
                                        <img src={headphones} alt="headphones" />
                                    </div>
                                    <div className="description">
                                        <h4>{order.announcement[0].item.title}</h4>
                                        <p>Cena: <span>{order.announcement[0].item.cost.value} zł</span></p>

                                        {order.items[0].selectedColor && (
                                            <div className="color">Color: <span>{order.items[0].selectedColor}</span></div>
                                        )}

                                        {order.items[0].selectedSize && (
                                            <div className="size">Size: <span>{order.items[0].selectedSize}</span></div>
                                        )}

                                        {order.items[0].quantity && (
                                            <div className="amount">Amount: <span>{order.items[0].quantity.value}</span></div>
                                        )}

                                        <div className="amount">Total: <span>{order.items[0].quantity.value * order.announcement[0].item.cost.value} zł</span></div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="description">
                                    <h4>Announcement not available</h4>
                                </div>
                            )}
                            <div className="orderInfo">
                                <div className="orderedAt">
                                    Ordered at: <span>{new Date(order.orderedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="delivery">
                                    Delivery: <span>{order.deliveryMethod.value}</span>
                                </div>
                            </div>
                            <div className="statusDiv">
                                <p>Status: <span className={`status ${order.items[0].orderStatus.value}`}>{order.items[0].orderStatus.value.charAt(0).toUpperCase() + order.items[0].orderStatus.value.slice(1)}</span></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-orders">You have no orders yet.</p>
                )}

                {orders.length > visibleOrders && (
                    <button className="styledButton" onClick={handleShowMore}>Show More</button>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
