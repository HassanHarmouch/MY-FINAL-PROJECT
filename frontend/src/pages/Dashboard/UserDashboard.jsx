// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from "../../components/button.jsx";
import { LogOut, User, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';  // Import the Navbar component

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/points', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPoints(response.data.points);
      } catch (error) {
        console.error('Error fetching user points:', error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.data);  // Adjust this based on your real response structure
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserPoints();
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Navbar />  {/* Add the Navbar here */}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {user ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {user.name}!</h1>
              <p className="text-lg text-gray-600 mb-6">
                You have <span className="font-semibold text-green-600">{points}</span> points 🎉
              </p>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => navigate('/my-requests')} 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <History className="h-5 w-5" /> View Recycling History
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => navigate('/profile')} 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <User className="h-5 w-5" /> Update Profile
                </Button>

                <Button 
                  variant="destructive" 
                  onClick={handleLogout} 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogOut className="h-5 w-5" /> Logout
                </Button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Loading your data...</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
