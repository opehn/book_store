const { validationResult } = require('express-validator');
const logger = require('../logger');

module.exports = {
    validate: function validate(req, res, next) {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            logger.info('[/join] Request data is not vaild');
            return res.status(401).json(err.array())
        } else {
            return next();
        }
    }

}

