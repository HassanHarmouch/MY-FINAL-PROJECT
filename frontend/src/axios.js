import axios from 'axios';

// Axios instance for API requests
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include token in headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
