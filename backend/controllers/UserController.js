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
    const { name, email, password, address, profilePicture } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      const newUser = new User({
        name,
        email,
        password,
        address,
        profilePicture,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server error while registering user' });
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
exports.loginWithGoogle = async (req, res) => {
  try {
    const { googleId, email } = req.body;
    console.log("Google UID:", googleId);
    console.log("Google Email:", email);

    const user = await User.findOne({ googleId, email });

    if (!user) {
      return res.status(401).json({ message: "User not registered or email does not match." });
    }

    // ✅ Generate token
    const token = createSendToken(user, 200, res); // This already sends a response!

    console.log("Generated Token:", token); // Debugging

    // ✅ Only return if token is valid (Avoids second response)
    if (!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }

  } catch (err) {
    console.error("Google login error:", err);

    // ✅ Ensure error response is sent only ONCE
    if (!res.headersSent) {
      res.status(500).json({ message: "Google login failed" });
    }
  }
};
exports.getProfile = async (req, res) => {
    try {
        // Explicitly select the points field
        const user = await User.findById(req.user.id).select('name email profilePicture address points');
        
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        console.log('User from DB:', user); // Verify points value in logs

        return res.json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                address: user.address,
                points: user.points || 0 // Fallback to 0 if undefined
            }
        });
    } catch (error) {
        console.error('Profile error:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};