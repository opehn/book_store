import { RequestHandler } from 'express';
const { books } = require('../services');
const logger = require('../shared/logger');

const allBookController: RequestHandler = async (req, res, next) => {
    logger.reportRequest(req.url, req.method);
    let { categoryId } = req.query;
    let limit = parseInt(req.query.limit as string);
    let offset = parseInt(req.query.offset as string);
    offset = limit * offset;

    if (categoryId) {
        let isNewParam = req.query.isNew as string;
        let isNew: boolean;
        if (!isNewParam) {
            let result = { message: 'No Data' };
            logger.reportResponse(req.url, req.method, result);
            res.status(401).json(result);
            return;
        }
        try {
            isNew = (isNewParam === 'true');
            const result = await books.getBookByCategory(categoryId, isNew, limit, offset);
            result.message = 'Success';
            logger.reportResponse(req.url, req.method, result);
            res.status(200).json(result);
        } catch (e) {
            logger.reportReponseErr(req.url, req.method, e);
            res.status(500).json({ message: 'Server Error' });
        }
    } else {
        try {
            const result = await books.getAllBooks(limit, offset);
            result.message = 'Success';
            logger.reportResponse(req.url, req.method, result);
            res.status(200).json(result);
        } catch (e) {
            logger.reportReponseErr(req.url, req.method, e);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

const bookDetailCotroller: RequestHandler = async (req, res, next) => {
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
}

export { allBookController, bookDetailCotroller };