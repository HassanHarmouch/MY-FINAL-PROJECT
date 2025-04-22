// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';

// Page imports
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Auth/Home';
import UserDashboard from './pages/Dashboard/UserDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import RecyclingCenters from './pages/Recycling/RecyclingCenters';
import RecyclingRequest from './pages/Recycling/RecyclingRequest';
import Profile from './pages/Dashboard/Profile.jsx';
import Notifications from './pages/Settings/Notifications';
import RewardPoints from './pages/Settings/RewardPoints';
import About from './components/About.jsx';

import 'leaflet/dist/leaflet.css';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />} {/* ✅ Only show on desired pages */}
      <div className={`${!shouldHideNavbar ? 'pt-24 mb-24' : ''}`}> {/* Add padding only if navbar is visible */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/recycling-centers" element={<RecyclingCenters />} />
          <Route path="/create-request" element={<RecyclingRequest />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reward-points" element={<RewardPoints />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
