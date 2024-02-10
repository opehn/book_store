const express = require('express');
const router = express.Router();
const { param, query } = require('express-validator');
const { like } = require('../services');
const { util } = require('../shared/lib');
const logger = require('../shared/logger');

router.put('/:bookId',
    [
        param('bookId').isInt().withMessage('No BookID'),
        query('liked').notEmpty().withMessage('No liked'),
        util.verifyToken
    ],
    async (req, res, next) => {
        logger.reportRequest(req.url, req.method);
        const { bookId } = req.params;
        let { liked } = req.query;
        const { userId } = req.user;

        if (liked === 'true')
            liked = true;
        else
            liked = false;
        try {
            let result = like.toggleLikeStatus(userId, bookId, liked);
            result.message = 'Success';
            logger.reportResponse(req.url, req.method, result);
            res.status(200).json(result);
        } catch (e) {
            logger.reportReponseErr(req.url, req.method, e);
            res.status(500).json({ message: "Server Error" });
        }
    });

module.exports = router;