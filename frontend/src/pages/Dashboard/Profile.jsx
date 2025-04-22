import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        profilePicture: '',
        address: '',
        points: 0
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage({ text: '❌ No token found. Please login.', type: 'error' });
                setLoading(false);
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const res = await axios.get('http://localhost:5000/api/users/profile', config);
            console.log('Profile response:', res.data);
            
            if (res.data.success) {
                setFormData({
                    name: res.data.data?.name || '',
                    email: res.data.data?.email || '',
                    profilePicture: res.data.data?.profilePicture || '',
                    address: res.data.data?.address || '',
                    points: res.data.data?.points || 0
                });
            }
        } catch (err) {
            console.error('Profile fetch error:', err);
            setMessage({ 
                text: err.response?.data?.error || '❌ Error fetching profile', 
                type: 'error' 
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: '', type: '' });

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}` 
                }
            };

            const res = await axios.put(
                'http://localhost:5000/api/users/updateProfile', 
                formData, 
                config
            );
            
            if (res.data.success) {
                setMessage({ 
                    text: res.data.message, 
                    type: 'success' 
                });
                // Refresh profile data after update
                fetchUserProfile();
            } else {
                setMessage({ 
                    text: 'Failed to update profile', 
                    type: 'error' 
                });
            }
        } catch (err) {
            setMessage({ 
                text: err.response?.data?.error || 'Error updating profile', 
                type: 'error' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 h-32 flex items-center justify-center">
  {formData.profilePicture ? (
    <img 
      src={formData.profilePicture} 
      alt="Profile" 
      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
    />
  ) : (
    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center shadow-md">
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    </div>
  )}
</div>

                    <div className="px-8 pt-16 pb-8">
                        {/* Points Display Section - Added Here */}
                        <div className="mb-6 p-4 bg-indigo-50 rounded-lg text-center border border-indigo-100">
                            <h2 className="text-sm font-medium text-indigo-700 mb-1">YOUR ECO POINTS</h2>
                            <div className="text-3xl font-bold text-indigo-600">
                                {formData.points}
                            </div>
                            <p className="text-xs text-indigo-500 mt-1">
                                Keep recycling to earn more rewards!
                            </p>
                        </div>

                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                            My Profile
                        </h1>

                        {message.text && (
                            <div className={`mb-6 p-4 rounded-lg ${
                                message.type === 'success' 
                                    ? 'bg-green-50 text-green-800 border border-green-200' 
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            } transition-all duration-300 animate-fade-in`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Rest of your form fields remain the same */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                                <input
                                    type="text"
                                    name="profilePicture"
                                    value={formData.profilePicture}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all duration-300 ${
                                    isSubmitting 
                                        ? 'bg-indigo-400 cursor-not-allowed' 
                                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                                }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </span>
                                ) : (
                                    'Update Profile'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;