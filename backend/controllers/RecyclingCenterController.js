const RecyclingCenter = require('../models/RecyclingCenter');

exports.getRecyclingCenters = async (req, res) => {
    try {
        const centers = await RecyclingCenter.find();
        res.json(centers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRecyclingCenterById = async (req, res) => {
    try {
        const center = await RecyclingCenter.findById(req.params.id);
        if (!center) return res.status(404).json({ error: 'Recycling center not found' });
        res.json(center);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addRecyclingCenter = async (req, res) => {
    try {
        const newCenter = new RecyclingCenter(req.body);
        await newCenter.save();
        res.status(201).json(newCenter);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};