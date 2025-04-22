import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const CenterCard = ({ center }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-4 w-full">
      <h2 className="text-xl font-semibold text-primary mb-1">{center.name}</h2>
      <div className="text-sm text-gray-600 mb-2 flex items-start">
        <MapPin className="w-4 h-4 mt-1 mr-2 text-gray-500" />
        <span>{center.address}</span>
      </div>

      <div className="flex flex-col gap-1 text-sm text-gray-700 mb-3">
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-2 text-gray-500" />
          <span>{center.contactNumber}</span>
        </div>
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2 text-gray-500" />
          <span>{center.email}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {center.acceptedMaterials?.length > 0 ? (
          center.acceptedMaterials.map((material, idx) => (
            <span
              key={idx}
              className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full"
            >
              {material}
            </span>
          ))
        ) : (
          <p className="text-sm text-gray-500">No materials listed</p>
        )}
      </div>
    </div>
  );
};

export default CenterCard;
