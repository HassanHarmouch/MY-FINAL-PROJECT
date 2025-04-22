const express = require('express');
const {
    register,
    login,
    updateProfile,
    changePassword
} = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

const router = express.Router(); // ✅ Initialize router first

// Public routes (accessible without authentication)
router.post('/register', register);
router.post('/login', login);

const { getUserPoints } = require('../controllers/UserController');
router.get('/points', authMiddleware(), getUserPoints);


// Protected routes (require authentication)
router.put('/profile', authMiddleware(), updateProfile);
router.put('/change-password', authMiddleware(), changePassword);

// Example: If you want an admin-only route, use authMiddleware('admin')
// router.delete('/admin/delete-user/:id', authMiddleware('admin'), deleteUser);

module.exports = router; // ✅ Export router at the end
