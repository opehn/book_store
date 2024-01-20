const express = require('express');
const router = express.Router();
const logger = require('../shared/logger');
const { category } = require('../services');


router.get('/',
    async (req, res) => {
        logger.reportRequest(req.url, req.method);
        try {
            const result = await category.getAllCategory();
            if (result) {
                result.message = 'Success';
                logger.reportResponse(req.url, req.method, result)
                res.status(200).json(result);
            }
        } catch (e) {
            logger.reportReponseErr(req.url, req.method, e);
            res.status(500).json({ message: 'Server error' });
        }
    }
)

module.exports = router;