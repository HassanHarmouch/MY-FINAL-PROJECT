const RecyclingRequest = require('../models/RecyclingRequest');
const RecyclingCenter = require('../models/RecyclingCenter');
const User = require('../models/User');
const createRecyclingRequest = async (req, res) => {
    const { materialType, recyclingCenter } = req.body;
    const userId = req.user.id;  // Get userId from decoded token (authMiddleware)

    try {
        // Ensure recycling center exists
        const center = await RecyclingCenter.findById(recyclingCenter);
        if (!center) {
            return res.status(400).json({ success: false, message: 'Recycling center not found' });
        }

        // Create new recycling request
        const newRequest = new RecyclingRequest({
            materialType,
            recyclingCenter,
            userId,
        });

        await newRequest.save();

 // Award points based on the material type (e.g., 10 points for each request)
 const pointsAwarded = 10;  // Customize this logic
 const user = await User.findById(userId);
 user.points += pointsAwarded;
 await user.save();





        res.status(201).json({
            success: true,
            message: `Recycling request created and ${pointsAwarded} points awarded!`,
            data: newRequest,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { createRecyclingRequest };
