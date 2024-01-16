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
            res.status(401).json({ message: 'Unauthorized' });
        }
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return (res.status(403).json({ message: 'Invalid token' }));
            }
            req.user = decoded;
            next();
        })
    },

    dbError: function dbError(res, err, query) {
        const route = req.originalUrl;
        logger.error(
            logger.error(`${route}`)
        )
    }
}