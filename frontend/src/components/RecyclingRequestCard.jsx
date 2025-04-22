import React from 'react';

const RecyclingRequestCard = ({ request }) => {
  return (
    <div className="recycling-request-card">
      <h3>{request.materialType}</h3>
      <p>Recycling Center: {request.recyclingCenter.name}</p>
    </div>
  );
};

export default RecyclingRequestCard;
