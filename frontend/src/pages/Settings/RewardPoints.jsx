import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './RewardPoints.css';
const RewardPoints = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get('/reward-points');
        setPoints(response.data.points);
      } catch (error) {
        console.error('Failed to fetch reward points:', error);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div>
      <h1>Reward Points</h1>
      <p>Your points: {points}</p>
    </div>
  );
};

export default RewardPoints;
