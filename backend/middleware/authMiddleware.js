const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers[authorization].split(' ')[1]; // Extract token from headers
   
    try {
        if (!token) {
            return res.status(403).json({ error: 'No token provided' });
        } 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;
