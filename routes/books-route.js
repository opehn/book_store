const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { books } = require('../services');
const { util } = require('../shared/lib');
const logger = require('../shared/logger');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res, next) => {
    logger.reportRequest(req.url, req.method);

    try {
        const result = await books.getAllBooks();
        result.message = 'Success';
        logger.reportResponse(req.url, req.method, result);
        res.status(200).json(result);
    } catch (e) {
        logger.reportReponseErr(req.url, req.method, e);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/:bookId',
    [
        param('bookId').notEmpty().withMessage('No bookId'),
        util.validate,
    ], async (req, res, next) => {
        logger.reportRequest(req.url, req.method);
        const { bookId } = req.params;
        try {
            const result = await books.getOneBook(bookId);
            result.message = 'Success';
            logger.reportResponse(req.url, req.method, result);
            res.status(200).json(result);
        } catch (e) {
            logger.reportReponseErr(req.url, req.method, e);
            res.status(500).json({ message: 'Server Error' });
        }

    })


module.exports = router;