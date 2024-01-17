const { validationResult } = require('express-validator');
const logger = require('../logger');
const jwt = require('jsonwebtoken');

module.exports = {
    validate: function validate(req, res, next) {
        const route = req.originalUrl;
        const err = validationResult(req);

        if (!err.isEmpty()) {
            logger.error(`[${route}] Request data is not vaild`);
            return res.status(401).json(err.array())
        } else {
            return next();
        }
    },

    verifyToken: function verifyToken(req, res, next) {
        const { token } = req.cookies;
        const secretKey = process.env.PRIVATE_KEY;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            let decoded = jwt.verify(token, secretKey);
            req.user = decoded;
            return next();
        } catch (e) {
            if (e.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                logger.error(`Request on ${req.url} failed | ${e}`);
                return res.status(500).json({ message: 'Server Error' });
            }
        }
    },

}