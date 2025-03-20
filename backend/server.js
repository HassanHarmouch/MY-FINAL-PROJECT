// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Initialize express app
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users')); // User routes
app.use('/api/requests', require('./routes/recyclingRequests')); // Recycling requests routes
app.use('/api/recycling-centers', require('./routes/recyclingCenters')); // Recycling centers routes
app.use('/api/notifications', require('./routes/notifications'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Error handler middleware (should be placed after routes)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
