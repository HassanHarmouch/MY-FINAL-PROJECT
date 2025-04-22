import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4 text-center">
        Welcome to EcoCycle🌍♻️
      </h1>
      <p className="text-lg md:text-xl text-gray-700 text-center max-w-2xl mb-6">
        Discover nearby recycling centers, track your recycling efforts, and earn rewards for protecting our planet!
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded-2xl shadow hover:bg-blue-600 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-gray-800 text-white rounded-2xl shadow hover:bg-gray-900 transition"
        >
          Sign Up
        </Link>
      </div>

      <div className="mt-10 text-center max-w-xl">
        <h2 className="text-2xl font-semibold text-green-600 mb-2">♻️ Why Recycle?</h2>
        <p className="text-gray-600">
          Reduce waste, save energy, and contribute to a cleaner future. Earn rewards while making an impact!
        </p>
      </div>
    </div>
    
  );
  
};

export default Home;
