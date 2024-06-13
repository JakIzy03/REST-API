// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { users } = require('../database');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.startsWith('Bearer ') 
        ? authHeader.split(' ')[1] 
        : authHeader;

    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = users.find(user => user.id === decoded.id);
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
