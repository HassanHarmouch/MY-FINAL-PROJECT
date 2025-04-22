import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './AdminDashboard.css'; 
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
