const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (requiredRole) {
    return function (req, res, next) {
        try {
            const authHeader = req.header('Authorization');
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ success: false, message: 'Unauthorized: No token provided.' });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded; // Attach decoded user data to the request

            // Check if the user has the required role
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            console.error('JWT Verification Error:', err);
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or expired token.' });
        }
    };
};
