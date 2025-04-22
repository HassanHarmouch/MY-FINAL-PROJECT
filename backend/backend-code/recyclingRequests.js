const express = require('express');
const authMiddleware = require('../middleware/auth');
const RecyclingRequest = require('../models/RecyclingRequest');
const { createRecyclingRequest } = require('../controllers/RecyclingRequestController');

const router = express.Router();

// POST request to create a new recycling request (with authentication)
router.post('/create-request', authMiddleware(), createRecyclingRequest);

// GET request to fetch all recycling requests for the authenticated user
router.get('/my-requests', authMiddleware(), async (req, res) => {
    try {
        const userId = req.user.id;
        const requests = await RecyclingRequest.find({ userId });

        if (requests.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No requests found for this user',
            });
        }

        res.status(200).json({
            success: true,
            data: requests,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching requests',
        });
    }
});

module.exports = router;
