const { validationResult } = require('express-validator');
const logger = require('../logger');
const jwt = require('jsonwebtoken');

module.exports = {
    validate: function validate(req, res, next) {
        const route = req.originalUrl;
        const err = validationResult(req);

        if (!err.isEmpty()) {
            logger.reportReponseErr(req.url, req.method, err);
            return res.status(401).json(err.array())
        } else {
            return next();
        }
    },

    verifyToken: function verifyToken(req, res, next) {
        const { token } = req.cookies;
        const secretKey = process.env.PRIVATE_KEY;
        if (!token) {
            result = { messge: 'Unauthorized' };
            logger.reportResponse(req.url, req.method, result);
            return res.status(401).json(result);
        }

        try {
            let decoded = jwt.verify(token, secretKey);
            req.user = decoded;
            return next();
        } catch (e) {
            //TODO : 제대로 동작 안함. 찾아봐야 함
            if (e.name === 'JsonWebTokenError') {
                result = { message: 'Invalid token' };
                logger.reportResponse(req.url, req.method, result);
                return res.status(403).json(result);
            } else {
                result = { message: 'Server Error' };
                logger.reportReponseErr(req.url, req.method, e);
                return res.status(500).json({ message: 'Server Error' });
            }
        }
    },
}