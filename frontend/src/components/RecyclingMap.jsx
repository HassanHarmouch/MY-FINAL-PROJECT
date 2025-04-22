// src/components/RecyclingMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RecyclingMap = ({ centers = [] }) => {
  const defaultPosition = [20.5937, 78.9629]; // Center of India (or use your region)

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-md mt-4">
      <MapContainer
        center={defaultPosition}
        zoom={5}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {centers?.length > 0 &&
          centers.map((center) =>
            center.location?.latitude && center.location?.longitude ? (
              <Marker
                key={center._id}
                position={[center.location.latitude, center.location.longitude]}
              >
                <Popup>
                  <div className="text-sm font-medium">
                    {center.name}
                    <br />
                    {center.address}
                  </div>
                </Popup>
              </Marker>
            ) : null
          )}
      </MapContainer>

      {centers?.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 bg-white px-4 py-2 rounded shadow">
          No recycling centers available.
        </div>
      )}
    </div>
  );
};

export default RecyclingMap;
