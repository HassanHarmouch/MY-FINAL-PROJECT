const express = require('express');
const authMiddleware = require('../middleware/auth');
const { updateNotificationPreferences } = require('../controllers/UserController');

const router = express.Router();

// Update notification preferences (protected route)
router.put('/preferences', authMiddleware(), updateNotificationPreferences);

module.exports = router;
