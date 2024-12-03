import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Messages.css";
import Navbar from '../Navbar/Navbar';
import headphones from "../../assets/sluchawki.webp";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import MessageBox from '../MessageBox/MessageBox';

const Messages = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Error");
  const [action, setAction] = useState("cancel");
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
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5050/Orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const fetchedAnnouncements = await Promise.all(
        orders.map(async (order) => {
          try {
            const announcementResponse = await axios.get(
              `http://localhost:5050/Announcement?announcementId=${order.items[0].announcementId}`
            );
            return announcementResponse.data;
          } catch (err) {
            console.error('Failed to fetch announcement', err);
            return null;
          }
        })
      );
      setAnnouncements(fetchedAnnouncements);
    };

    if (orders.length > 0) {
      fetchAnnouncements();
    }
  }, [orders]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(
            `http://localhost:5050/Users/user?userId=${user.id}`
          );
          setUserData(response.data);
        } catch (err) {
          console.error('Failed to fetch user data', err);
        }
      }
    };

    fetchUserData();
  }, [user]);



  const updateOrderStatus = async (orderId, itemId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/Orders?orderId=${orderId}&itemId=${itemId}`,
          newStatus ,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
        }
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  items: order.items.map((item) =>
                    item.id === itemId
                      ? { ...item, orderStatus: { value: newStatus } }
                      : item
                  ),
                }
              : order
          )
        );

      setAction("success");
      setMessage("Changed status of the order!");
      setVisible(true);
      }
    } catch (err) {
      console.error('Failed to update order status', err);
      setAction("cancel");
      setVisible(true);
      setMessage("Error while updating status.");
    }
  };



  const acceptOrder = (orderId, itemId) => {
    updateOrderStatus(orderId, itemId, 'accepted');
  };

  const declineOrder = (orderId, itemId) => {
    updateOrderStatus(orderId, itemId, 'declined');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="messages">
      <Navbar active={"messages"} user={user} />
      <div className="messages-container container">
        <Header text="Messages" icons={true} />
        {/* {visible && <MessageBox action={action} message={message} />} */}
        
        
        {orders.map((order, index) => (
          <div key={order.id} className="message flex">
            <Link to={`/announcement?announcementId=${order.items[0].announcementId}`} className="flex">
              <div className="image">
                <img src={headphones} alt="headphones" />
              </div>
              <div className="description">
                <h4>{announcements[index]?.[0]?.item?.title}</h4>
                <p>Cena: <span>{announcements[index]?.[0]?.item?.cost.value}</span> zł</p>

                {order.items[0]?.selectedColor && (
                  <div className="color">
                    Color: <span>{order.items[0].selectedColor}</span>
                  </div>
                )}

                {order.items[0]?.selectedSize && (
                  <div className="size">
                    Size: <span>{order.items[0].selectedSize}</span>
                  </div>
                )}

                {order.items[0]?.quantity?.value && (
                    <div className="amount">
                      Amount: <span>{order.items[0].quantity.value}</span>
                    </div>
                  )}
              </div>
            </Link>

            <div className="orderInfo">
              <div className="orderedAt">Ordered at: <span>{new Date(order.orderedAt).toLocaleDateString()}</span></div>
              <Link to={`/profile?userId=${userData.id.value}`}>Ordered by: <span>{userData.email.value}</span></Link>
              <div className="delivery">Delivery: <span>{order.deliveryMethod.value}</span></div>
              <div className={`status ${order.items[0].orderStatus.value}`}>
                Status: <span>{order.items[0].orderStatus.value}</span>
              </div>
            </div>
            <div className="buttons flex">
              <button className="styledButton" onClick={() => acceptOrder(order.id, order.items[0].id)}>
                Accept
              </button>
              <button className="styledButton" onClick={() => declineOrder(order.id, order.items[0].id)}>
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
