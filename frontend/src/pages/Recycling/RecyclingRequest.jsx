import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const RecyclingRequest = () => {
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [centerMaterials, setCenterMaterials] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for centerId in URL params
  const searchParams = new URLSearchParams(location.search);
  const centerIdFromUrl = searchParams.get('centerId');

  // Fetch recycling centers from the database
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recycling-centers', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCenters(response.data.data);
        
        // If centerId is in URL, auto-select it
        if (centerIdFromUrl) {
          const centerExists = response.data.data.some(center => center._id === centerIdFromUrl);
          if (centerExists) {
            setSelectedCenter(centerIdFromUrl);
            const center = response.data.data.find(c => c._id === centerIdFromUrl);
            setCenterMaterials(center.materialsAccepted || []);
          }
        }
      } catch (err) {
        setError("Failed to load recycling centers.");
      }
    };

    fetchCenters();
  }, [centerIdFromUrl]);

  // Handle recycling center selection
  const handleCenterChange = (e) => {
    const centerId = e.target.value;
    setSelectedCenter(centerId);
    setMaterialType(""); // Reset material when changing center

    // Find the selected center and update the available materials
    const center = centers.find((center) => center._id === centerId);
    if (center) {
      setCenterMaterials(center.materialsAccepted || []);
    }
  };

  // Rest of your component remains the same...
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/recycling-centers/create-request",
        {
          materialType,
          recyclingCenter: selectedCenter,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.message);
      navigate("/recycling-centers");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create recycling request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Create Recycling Request</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-2 text-gray-700">Choose Recycling Center:</label>
          <select
            value={selectedCenter}
            onChange={handleCenterChange}
            className="w-full border border-gray-300 p-2 rounded-xl focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">-- Select Center --</option>
            {centers.map((center) => (
              <option key={center._id} value={center._id}>
                {center.name} - {center.location.address}
              </option>
            ))}
          </select>
        </div>

        {selectedCenter && (
          <div>
            <label className="block mb-2 text-gray-700">Select Material Type:</label>
            <select
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-xl focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">-- Select Material --</option>
              {centerMaterials.length > 0 ? (
                centerMaterials.map((material, index) => (
                  <option key={index} value={material}>
                    {material}
                  </option>
                ))
              ) : (
                <option value="">No materials available</option>
              )}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !selectedCenter || !materialType}
          className="bg-green-600 text-white py-2 rounded-2xl shadow hover:bg-green-700 transition"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RecyclingRequest;