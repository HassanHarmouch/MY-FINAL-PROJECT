const RecyclingCenter = require('../models/RecyclingCenter');

exports.getRecyclingCenters = async (req, res) => {
    try {
        const { material, lat, lng, maxDistance } = req.query;

        let query = {};
        
        // Filter by material type if provided
        if (material) {
            query.materialsAccepted = material;
        }

        // Filter by location if lat & lng are provided
        if (lat && lng) {
            query.location = {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: maxDistance ? parseFloat(maxDistance) : 5000, // Default 5km
                }
            };
        }

        const centers = await RecyclingCenter.find(query).select('name address phone whatsapp materialsAccepted location');

        // Add WhatsApp click-to-chat link
        const formattedCenters = centers.map(center => ({
            ...center._doc,
            whatsappLink: center.whatsapp ? `https://wa.me/${center.whatsapp.replace(/\D/g, '')}` : null
        }));
        res.json({ success: true, data: centers });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getRecyclingCenterById = async (req, res) => {
    try {
        const center = await RecyclingCenter.findById(req.params.id);
        if (!center) return res.status(404).json({ success: false, error: 'Recycling center not found' });
        res.json({ success: true, data: center });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.addRecyclingCenter = async (req, res) => {
    try {
        const newCenter = new RecyclingCenter(req.body);
        await newCenter.save();
        res.status(201).json({ success: true, message: 'Recycling center created successfully', data: newCenter });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
