const RecyclingRequest = require('../models/RecyclingRequest');
const RecyclingCenter = require('../models/RecyclingCenter');

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

    res.status(201).json({
      success: true,
      message: 'Recycling request created successfully',
      data: newRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { createRecyclingRequest };