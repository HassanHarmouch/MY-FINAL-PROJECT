const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.updateProfile = async (req, res) => {
    try {
        const { name, email, profilePicture, address } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.profilePicture = profilePicture || user.profilePicture;
        user.address = address || user.address;

        await user.save();

        res.json({ success: true, message: 'Profile updated successfully', data: user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.updateNotificationPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update notification preferences
        user.notificationPreferences = {
            reminders: req.body.reminders ?? user.notificationPreferences.reminders,
            news: req.body.news ?? user.notificationPreferences.news,
        };

        await user.save();
        res.json({ success: true, message: 'Notification preferences updated', data: user.notificationPreferences });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
    }
};

exports.getUserPoints = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, points: user.points });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const { oldPassword, newPassword } = req.body;
        
        // Check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Old password is incorrect' });
        }

        // Hash and update password
        user.password = await bcrypt.hash(newPassword, 10);
await user.save();
console.log("Updated password hash: ", user.password);  // Debugging line


        // Generate a new token after the password change
        const newToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Send the response with the new token
        res.json({ success: true, message: 'Password changed successfully', token: newToken });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
    }
};

exports.register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message || 'Failed to register user' });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Compare the password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Generate a new JWT token after login
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
    }
};
