import * as express from 'express';
const router = express.Router();
import express_validator = require('express-validator');
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