import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecyclingCenters = () => {
  const [centers, setCenters] = useState([]);
  const [material, setMaterial] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch recycling centers from the backend
  const fetchCenters = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Assuming JWT is stored here

      // Prepare the API query parameters (no filters for now)
      const params = {
        material,
      };

      // Make the API call to get recycling centers from the backend
      const response = await axios.get('http://localhost:5000/api/recycling-centers', {
        headers: { Authorization: `Bearer ${token}` },
        params: params,
      });

      // Update state with fetched data
      setCenters(response.data.data);
    } catch (error) {
      console.error('Error fetching centers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch centers when the component mounts or when material changes
  useEffect(() => {
    fetchCenters();
  }, [material]);

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        Nearby Recycling Centers
      </h1>

      {/* Material filter buttons */}
      <div className="flex justify-center mb-10 gap-5 flex-wrap">
        {['plastic', 'paper', 'glass', 'metal'].map((type) => (
          <button
            key={type}
            onClick={() => setMaterial(type)}
            className={`px-4 py-2 rounded-2xl text-white shadow transition ${
              material === type ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setMaterial('')}
          className="px-4 py-2 rounded-2xl bg-gray-400 text-white shadow hover:bg-gray-500 transition"
        >
          Clear Filter
        </button>
      </div>

      {/* Loading or no centers message */}
      {loading ? (
        <p className="text-center text-gray-700">Loading centers...</p>
      ) : centers.length === 0 ? (
        <p className="text-center text-gray-600">No recycling centers found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {centers.map((center) => (
    <div
      key={center._id}
      className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
    >
      <h2 className="text-xl font-semibold text-green-700 mb-2">
        {center.name}
      </h2>
      <p className="text-gray-700 mb-1">📞 {center.phone}</p>
      {center.whatsapp && (
        <a
          href={`https://wa.me/${center.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 underline block mb-2"
        >
          💬 Chat on WhatsApp
        </a>
      )}
      <div className="mt-2 text-sm text-gray-500">
        Accepts: {center.materialsAccepted.join(', ')}
      </div>

      {/* Request Button  */}
      <a
  href={`/create-request?centerId=${center._id}`}
  className="mt-4 w-full block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-2xl shadow transition"
>
  ♻️Request Pickup♻️
</a>
    </div>
  ))}
</div>
      )}
    </div>
  );
};

export default RecyclingCenters;
