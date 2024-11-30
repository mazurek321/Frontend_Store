import React, { useEffect, useState } from 'react';
import "./Saved.css";
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import headphones from "../../assets/sluchawki.webp";
import axios from 'axios';

const Saved = ({ user }) => {
  const [savedAnnouncements, setSavedAnnouncements] = useState([]); 
  const [announcementsDetails, setAnnouncementsDetails] = useState([]);

  useEffect(() => {
    const fetchSavedAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5050/SavedAnnouncements', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        setSavedAnnouncements(response.data); 

        const details = await Promise.all(response.data.map(async (savedAnnouncement) => {
          const announcementResponse = await axios.get(`http://localhost:5050/Announcement?announcementId=${savedAnnouncement.announcementId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          return announcementResponse.data; 
        }));

        setAnnouncementsDetails(details);

      } catch (error) {
        console.error('Error fetching saved announcements:', error);
      }
    };

    fetchSavedAnnouncements();
  }, []); 

  const handleDelete = async (announcementId) => {
    try {
      await axios.delete(`http://localhost:5050/SavedAnnouncements?announcementId=${announcementId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSavedAnnouncements(savedAnnouncements.filter(announcement => announcement.announcementId !== announcementId));
      window.location.reload(); 

    } catch (error) {
      console.error('Error deleting saved announcement:', error);
    }
  };

  return (
    <div className='saved'>
      <Navbar active={"saved"} user={user} />
      <div className="saved-container container">
        <Header text="Saved announcements" icons={true} />

        {announcementsDetails.length > 0 ? (
          savedAnnouncements.map((savedAnnouncement, index) => {
            const announcement = announcementsDetails[index]; 

            if (!announcement) return null; 

            return (
              <div className="saved item flex" key={savedAnnouncement.announcementId}>
                <span className="material-symbols-outlined icon" onClick={() => handleDelete(savedAnnouncement.announcementId)}>delete</span>
                <Link to={`/announcement?announcementId=${savedAnnouncement.announcementId}`} className='flex'>
                  <div className="image">
                    <img src={headphones} alt={"Saved Item"} />
                  </div>
                  <div className="description">
                    <h4>{announcement[0].item.title}</h4>
                    <p>{announcement[0].item.description}</p>
                    <p>Cena: <span>{announcement[0].item.cost.value} zł</span></p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No saved announcements yet.</p>
        )}
      </div>
    </div>
  );
};

export default Saved;
