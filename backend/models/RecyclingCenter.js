const mongoose = require('mongoose');

const RecyclingCenterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length === 2;
                },
                message: 'Coordinates must be an array of [longitude, latitude].',
            }
        }
    },
    address: { type: String, required: true },
    materialsAccepted: { type: [String], required: true }, // e.g. ['plastic', 'metal']
    phone: { type: String, required: true }, // Contact phone number
    whatsapp: { type: String }, // WhatsApp number (optional)
}, { timestamps: true });

// Ensure the geospatial index is created
RecyclingCenterSchema.index({ location: '2dsphere' });

const RecyclingCenter = mongoose.model('RecyclingCenter', RecyclingCenterSchema);
module.exports = RecyclingCenter;