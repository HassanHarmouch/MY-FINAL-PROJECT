import React from 'react';

const RecyclingCenterCard = ({ center }) => {
  return (
    <div className="recycling-center-card">
      <h3>{center.name}</h3>
      <p>{center.address}</p>
      <p>{center.phone}</p>
      {center.whatsapp && <a href={center.whatsappLink} target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a>}
    </div>
  );
};

export default RecyclingCenterCard;
