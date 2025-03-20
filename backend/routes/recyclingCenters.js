const express = require('express');
const authMiddleware = require('../middleware/auth');
const RecyclingCenter = require('../models/RecyclingCenter');
const { createRecyclingRequest } = require('../controllers/RecyclingRequestController');
const { getRecyclingCenters } = require('../controllers/RecyclingCenterController'); // Corrected import

const router = express.Router();

// POST request to create a new recycling request (with authentication)
router.post('/create-request', authMiddleware(), createRecyclingRequest);

// Route to get recycling centers with filtering
router.get('/', authMiddleware(),getRecyclingCenters);



// GET a specific recycling center by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recyclingCenter = await RecyclingCenter.findById(id).select('name address phone whatsapp materialsAccepted location');
        if (!recyclingCenter) {
            return res.status(404).json({
                success: false,
                message: 'Recycling Center not found',
            });
        }
        res.status(200).json({
            success: true,
            data: {
                ...recyclingCenter._doc,
                whatsappLink: recyclingCenter.whatsapp ? `https://wa.me/${recyclingCenter.whatsapp.replace(/\D/g, '')}` : null
            }
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
