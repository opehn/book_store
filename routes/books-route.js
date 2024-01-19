const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { books } = require('../services');
const { util } = require('../shared/lib');
const logger = require('../shared/logger');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res, next) => {
    logger.reportRequest(req.url, req.method);
    let { categoryId } = req.query;

    if (categoryId) {
        let { isNew } = req.query;
        if (!isNew) {
            let result = { message: 'No Data' };
            logger.reportResponse(req.url, req.method, result);
            res.status(401).json(result);
        }
        try {
            isNew = (isNew === 'true');
            const result = await books.getBookByCategory(categoryId, isNew);
            result.message = 'Success';
            logger.reportResponse(req.url, req.method, result);
            res.status(200).json(result);
        } catch (e) {
            logger.reportReponseErr(req.url, req.method, e);
            res.status(500).json({ message: 'Server Error' });
        }
    } else {
        try {
            const result = await books.getAllBooks();
            result.message = 'Success';
            logger.reportResponse(req.url, req.method, result);
            res.status(200).json(result);
        } catch (e) {
            logger.reportReponseErr(req.url, req.method, e);
            res.status(500).json({ message: 'Server Error' });
        }
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
            const result = await books.getBookDetail(bookId);
            result.message = 'Success';
            logger.reportResponse(req.url, req.method, result);
            res.status(200).json(result);
        } catch (e) {
            logger.reportReponseErr(req.url, req.method, e);
            res.status(500).json({ message: 'Server Error' });
        }

    })

module.exports = router;