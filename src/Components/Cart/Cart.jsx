import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Cart.css";
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  
import Header from '../Header/Header';
import headphones from "../../assets/sluchawki.webp";
import MessageBox from '../MessageBox/MessageBox';

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [shipmentOption, setShipmentOption] = useState('inpost');  
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Error");
  const [action, setAction] = useState("cancel");
  let timer;

  const navigate = useNavigate();  

  useEffect(() => {
    timer = setTimeout(() => {
      setVisible(false);
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5050/ShoppingCart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const updatedItems = await Promise.all(response.data.items.map(async (item) => {
          try {
            const announcementResponse = await axios.get(`http://localhost:5050/Announcement?announcementId=${item.announcementId}`);
            return { ...item, announcement: announcementResponse.data };
          } catch (error) {
            console.error("Error fetching announcement:", error);
            return item; 
          }
        }));

        setCartItems(updatedItems); 
      } catch (error) {
        console.error("Error fetching the shopping cart data:", error);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = (id, action) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        let updatedQuantity = item.quantity.value;
        if (action === 'increase') {
          updatedQuantity += 1;
        } else if (action === 'decrease' && updatedQuantity > 0) {
          updatedQuantity -= 1;
        }
        return { ...item, quantity: { value: updatedQuantity } };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const makeOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5050/Orders?order=true', 
        `${shipmentOption}`, 
        {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      setAction("success");
      setMessage("Successfully ordered!");
      setVisible(true);
      setTimeout(() => {
        navigate("/my-orders");
      }, 3000);
    } catch (error) {
      setAction("cancel");
      setVisible(true);
      setMessage("Error while placing order.");
      console.error("Error placing the order:", error.response?.data || error.message);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.announcement[0]?.item.cost.value || 0;
      const itemQuantity = item.quantity.value || 0;
      return total + (itemPrice * itemQuantity);
    }, 0);
  };

  return (
    <div className="cart">
      <Navbar active={"cart"} user={user} />
      <div className="container">
        <Header text="Shopping Cart" />
        {visible && <MessageBox action={action} message={message} />}
        {cartItems.length > 0 ? (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="item flex">
                <div className="buttons flex">
                  <button className='favorite'>
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                  <button className='delete'>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>

                <Link to={`/announcement?announcementId=${item.announcement[0].id}`} className='flex'>
                  <div className="image">
                    <img src={headphones} alt="headphones" />
                  </div>
                  <div className="description">
                    <h4>{item.announcement[0].item.title}</h4> 
                    <p>Cena: <span>{item.announcement[0].item.cost.value}</span> zł</p>

                    {item.selectedColor && (
                      <div className="size-color flex">
                        <p>Color: <span>{item.selectedColor}</span></p>
                      </div>
                    )}
                    {item.selectedSize && (
                      <div className="size-color flex">
                        <p>Size: <span>{item.selectedSize}</span></p>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="amount flex">
                  <button
                    className='decrease'
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity.value}
                    readOnly
                  />
                  <button
                    className='increase'
                    onClick={() => handleQuantityChange(item.id, 'increase')}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="order flex">
              <h3>Select shipment option:</h3>
              <select
                value={shipmentOption}
                onChange={(e) => setShipmentOption(e.target.value)}
              >
                <option value="inpost">Inpost</option>
                <option value="dpd">Dpd</option>
              </select>

              <h3>Total: <span>{calculateTotal()}</span> zł</h3>

              <button className='styledButton' onClick={makeOrder}>Place order</button>
            </div>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
