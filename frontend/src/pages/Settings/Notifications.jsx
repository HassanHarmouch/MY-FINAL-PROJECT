import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './Notifications.css';
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notification Settings</h1>
      <div>
        {notifications.map((notification) => (
          <div key={notification._id}>
            <p>{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
