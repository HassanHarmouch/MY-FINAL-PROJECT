import React from 'react';

const RewardPointsCard = ({ points }) => {
  return (
    <div className="reward-points-card">
      <h3>Reward Points</h3>
      <p>{points} points</p>
    </div>
  );
};

export default RewardPointsCard;
