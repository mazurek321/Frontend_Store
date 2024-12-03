import React, { useEffect, useRef, useState } from 'react';
import './MyAnnouncements.css';
import headphones from '../../assets/sluchawki.webp';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';

const listOfCategories = [
  "Ski Apparel",
  "Ski & Snowboard Gear",
  "Safety Gear",
  "Travel & Storage",
  "Maintenance & Accessories"
];

const MyAnnouncements = ({ user }) => {
  const [clicked, setClicked] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const box = useRef();

  const handleClick = (e) => {
    (box.current && !box.current.contains(e.target)) && setClicked(false);
  };

  const initialFormData = {
    title: '',
    description: '',
    amount: 0,
    cost: 0,
    categories: [],
    colorsSizesAmount: null,
    colorsAmount: null,
    model_Brand: '',
    selectedOption: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/Announcement/my', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      categories: selectedCategories,
    });
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      selectedOption: value,
      colorsAmount: value === 'colors' ? {} : null, 
      colorsSizesAmount: value === 'colorsAndSizes' ? {} : null,
    });
  };
  

  const handleAddColor = () => {
    const newColorKey = `additionalProp${Object.keys(formData.colorsAmount).length + 1}`;
    setFormData({
      ...formData,
      colorsAmount: {
        ...formData.colorsAmount,
        [newColorKey]: 0,
      },
    });
  };

  const handleColorAmountChange = (colorKey, amount) => {
    setFormData({
      ...formData,
      colorsAmount: {
        ...formData.colorsAmount,
        [colorKey]: amount,
      },
    });
  };

  const handleAddColorSize = () => {
    const newColorKey = `color${Object.keys(formData.colorsSizesAmount).length + 1}`;
    setFormData({
      ...formData,
      colorsSizesAmount: {
        ...formData.colorsSizesAmount,
        [newColorKey]: {
          size1: 0,
        },
      },
    });
  };

  const handleAddSizeToColor = (colorKey) => {
    setFormData({
      ...formData,
      colorsSizesAmount: {
        ...formData.colorsSizesAmount,
        [colorKey]: {
          ...formData.colorsSizesAmount[colorKey],
          [`size${Object.keys(formData.colorsSizesAmount[colorKey]).length + 1}`]: 0,
        },
      },
    });
  };

  const handleColorSizeChange = (colorKey, size, amount) => {
    const newColorsSizesAmount = { ...formData.colorsSizesAmount };
    
    if (size !== formData.colorsSizesAmount[colorKey]) {
      const updatedSizeData = { ...newColorsSizesAmount[colorKey], [size]: amount };
      newColorsSizesAmount[colorKey] = updatedSizeData;
    } else {
      newColorsSizesAmount[colorKey][size] = amount;
    }
  
    setFormData({
      ...formData,
      colorsSizesAmount: newColorsSizesAmount,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { selectedOption, ...dataToSend } = formData;

    console.log('Announcement created:', dataToSend);
    
    try {
      const response = await axios.post('http://localhost:5050/Announcement', dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Announcement created:', response.data);
      setClicked(false)
      handleResetForm()
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert("Something went wrong.")
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormData);
    setClicked(false); 
  };

  const handleDelete = async (announcementId) => {
    try {
      await axios.delete(`http://localhost:5050/Announcement?announcementId=${announcementId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      setAnnouncements(announcements.filter((announcement) => announcement.id !== announcementId));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };
  

  return (
    <div className='my-announcements'>
      <Navbar active={'profile'} user={user} />

      <div className='my-announcements-container container'>
        <Header text='My announcements' icons={true} />
        <div className='add-announcement'>
          <button className='styledButton end' onClick={() => setClicked(true)}>
            + Add announcement
          </button>
        </div>

        {clicked && (
          <div className='newAnnouncement' onClick={(e) => handleClick(e)}>
            <div className='panel' ref={box}>
              <h3>New announcement</h3>
              <form onSubmit={handleSubmit}>
                <h3>Name</h3>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <h3>Description</h3>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <h3>Price</h3>
                <input
                  type='number'
                  name='cost'
                  value={formData.cost}
                  onChange={handleInputChange}
                />
                <h3>Amount</h3>
                <input
                  type='number'
                  name='amount'
                  value={formData.amount}
                  onChange={handleInputChange}
                />

                <h3>Categories</h3>
                <select
                  name='categories'
                  value={formData.categories}
                  onChange={handleCategoryChange}
                  multiple
                >
                  {listOfCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <h3>Model/Brand</h3>
                <input
                  type='text'
                  name='model_Brand'
                  value={formData.model_Brand}
                  onChange={handleInputChange}
                />

                <div>
                  <input
                    type='radio'
                    name='radioInput'
                    value='colors'
                    checked={formData.selectedOption === 'colors'}
                    onChange={handleRadioChange}
                  />
                  <label>Add colors</label>
                  <input
                    type='radio'
                    name='radioInput'
                    value='colorsAndSizes'
                    checked={formData.selectedOption === 'colorsAndSizes'}
                    onChange={handleRadioChange}
                  />
                  <label>Add colors and sizes</label>
                </div>

                {formData.selectedOption === 'colors' && (
  <div>
    <h3>Colors and Amounts</h3>
    {Object.keys(formData.colorsAmount).map((colorKey, index) => (
      <div key={colorKey}>
        <input
          type='text'
          placeholder='Color'
          value={colorKey}
          onChange={(e) => {
            const newColorKey = e.target.value; 
            const newColorsAmount = { ...formData.colorsAmount };
            newColorsAmount[newColorKey] = formData.colorsAmount[colorKey]; 
            delete newColorsAmount[colorKey]; 
            setFormData({
              ...formData,
              colorsAmount: newColorsAmount,
            });
          }}
        />
        <input
          type='number'
          placeholder='Amount'
          value={formData.colorsAmount[colorKey]}
          onChange={(e) =>
            handleColorAmountChange(colorKey, Number(e.target.value))
          }
        />
      </div>
    ))}
    <button type='button' onClick={handleAddColor}>
      Add Color
    </button>
  </div>
)}


{formData.selectedOption === 'colorsAndSizes' && (
  <div>
    <h3>Colors, Sizes, and Amounts</h3>
    {Object.keys(formData.colorsSizesAmount).map((colorKey) => (
      <div key={colorKey}>
        <h4>
          <input
            type='text'
            placeholder='Color'
            value={colorKey}
            onChange={(e) => {
              const newColorKey = e.target.value;
              const newColorsSizesAmount = { ...formData.colorsSizesAmount };
              newColorsSizesAmount[newColorKey] = formData.colorsSizesAmount[colorKey];
              delete newColorsSizesAmount[colorKey];
              setFormData({
                ...formData,
                colorsSizesAmount: newColorsSizesAmount,
              });
            }}
          />
        </h4>

        {Object.keys(formData.colorsSizesAmount[colorKey]).map((size) => (
          <div key={size}>
            <input
              type='text'
              placeholder='Size'
              value={size} 
              onChange={(e) => {
                const newSize = e.target.value;

                const updatedSizes = { ...formData.colorsSizesAmount[colorKey] };

                delete updatedSizes[size]; 
                updatedSizes[newSize] = updatedSizes[size] || 0; 

                setFormData({
                  ...formData,
                  colorsSizesAmount: {
                    ...formData.colorsSizesAmount,
                    [colorKey]: updatedSizes,
                  },
                });
              }}
            />

            <input
              type='number'
              placeholder='Amount'
              value={formData.colorsSizesAmount[colorKey][size]}
              onChange={(e) => {
                const amount = Number(e.target.value);
                handleColorSizeChange(colorKey, size, amount);
              }}
            />
          </div>
        ))}

        <button type='button' onClick={() => handleAddSizeToColor(colorKey)}>
          Add Size
        </button>
      </div>
    ))}

    <button type='button' onClick={handleAddColorSize}>
      Add Color, Size, and Amount
    </button>
  </div>
)}





                <div className="buttons flex">
                  <button type='submit' className='styledButton'>
                    Create Announcement
                  </button>
                  <button type="button" className='styledButton' onClick={handleResetForm}>
                    Decline
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          announcements.slice(0, visibleCount).map((announcement) => (
            <div key={announcement.id} className='announcements flex'>
              <Link to={`/announcement?announcementId=${announcement.id}`}>
                <div className='image'>
                  <img src={headphones} alt={announcement.item.title} />
                </div>
              </Link>
              <div className='description'>
                <Link to={`/announcement?announcementId=${announcement.id}`}>
                  <h3 className='flex header'>{announcement.item.title}</h3>
                </Link>
                <p className='itemDescription'>{announcement.item.description}</p>
                <p className='price'>
                  Cena: <span>{announcement.item.cost.value} zł</span>
                </p>
                <Link to={`/announcement?announcementId=${announcement.id}`}>
                  <button className='styledButton'>View</button>
                </Link>
                <button className='styledButton' onClick={()=>handleDelete(announcement.id)}>Delete</button>
              </div>
            </div>
          ))
        )}

        {announcements.length > visibleCount && (
          <div className='show-more'>
            <button className='styledButton end' onClick={handleShowMore}>
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAnnouncements;
