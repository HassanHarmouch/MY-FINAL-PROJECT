const express = require('express');
const {
    register,
    login,
    updateProfile,loginWithGoogle,
    changePassword,getProfile
} = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

const router = express.Router(); // ✅ Initialize router first

// Public routes (accessible without authentication)
router.post('/register', register);
router.post('/login', login);
router.post('/loginWithGoogle', loginWithGoogle);

const { getUserPoints } = require('../controllers/UserController');
router.get('/points', authMiddleware(), getUserPoints);


// Protected routes (require authentication)
router.get('/profile', authMiddleware(), getProfile);
router.put('/updateProfile', authMiddleware(), updateProfile);


// Example: If you want an admin-only route, use authMiddleware('admin')
// router.delete('/admin/delete-user/:id', authMiddleware('admin'), deleteUser);

module.exports = router; // ✅ Export router at the end
