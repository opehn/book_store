const { validationResult } = require('express-validator');
const logger = require('../logger');

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

    dbError: function dbError(res, err, query) {
        const route = req.originalUrl;
        logger.error(
            logger.error(`${route}`)
        )
    }
}