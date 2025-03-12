const mongoose = require('mongoose');

const RecyclingCenterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    materialsAccepted: { type: [String], required: true }
}, { timestamps: true });

module.exports = mongoose.model('RecyclingCenter', RecyclingCenterSchema);