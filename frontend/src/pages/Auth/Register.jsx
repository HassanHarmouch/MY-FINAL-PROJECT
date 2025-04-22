import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        address,
        profilePicture,
      });

      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Profile Picture URL</label>
            <input
              type="text"
              placeholder="https://your-image-url.com/photo.jpg"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
