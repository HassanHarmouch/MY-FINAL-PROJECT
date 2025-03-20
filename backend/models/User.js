const mongoose = require('mongoose');  // Add this line to import mongoose
const bcrypt = require('bcryptjs');  // Import bcryptjs here
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profilePicture: { type: String },  // URL or file path for profile picture
    address: { type: String },  // User's address
    phoneNumber: { type: String }, // Optional phone number
    points: { type: Number, default: 0 },  // Reward points

    lastRecyclingActivity: { type: Date, default: null }, // Last recycling action
    notificationPreferences: {
        reminders: { type: Boolean, default: true }, // Recycling reminders
        news: { type: Boolean, default: true }, // Environmental news & promotions
    },

    recyclingHistory: [{
        date: { type: Date, default: Date.now },
        materialType: { type: String }, // Plastic, Paper, etc.
        weight: { type: Number }, // In kg
        pointsEarned: { type: Number, default: 0 }
    }],

    badges: [{ type: String }], // List of earned badges

}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);