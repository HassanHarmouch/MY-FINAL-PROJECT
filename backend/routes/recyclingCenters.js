// routes/recyclingCenters.js
const express = require('express');
const authMiddleware = require('../middleware/auth');
const RecyclingCenter = require('../models/RecyclingCenter'); // Import the RecyclingCenter model
const { createRecyclingRequest } = require('../controllers/RecyclingRequestController');

const router = express.Router();

// POST request to create a new recycling request (with authentication)
router.post('/create-request', authMiddleware, createRecyclingRequest);

// GET all recycling centers (no authentication required, unless needed)
router.get('/', async (req, res) => {
    try {
        const recyclingCenters = await RecyclingCenter.find(); // Fetch all recycling centers from DB
        res.status(200).json({
            success: true,
            data: recyclingCenters,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching recycling centers',
        });
    }
});

// GET a specific recycling center by ID (no authentication required)
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recyclingCenter = await RecyclingCenter.findById(id); // Fetch the recycling center by ID
        if (!recyclingCenter) {
            return res.status(404).json({
                success: false,
                message: 'Recycling Center not found',
            });
        }
        res.status(200).json({
            success: true,
            data: recyclingCenter,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching recycling center',
        });
    }
});

module.exports = router;