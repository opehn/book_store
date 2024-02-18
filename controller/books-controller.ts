import { RequestHandler } from 'express';
const { books } = require('../services');
import logger from '../shared/logger';

const allBookController: RequestHandler = async (req, res, next) => {
    let { categoryId } = req.query;
    let limit = parseInt(req.query.limit as string);
    let offset = parseInt(req.query.offset as string);
    offset = limit * offset;

    if (categoryId) {
        let isNewParam = req.query.isNew as string;
        let isNew: boolean;
        if (!isNewParam) {
            let result = { message: 'No Data' };
            res.status(401).json(result);
            return;
        }
        try {
            isNew = (isNewParam === 'true');
            const result = await books.getBookByCategory(categoryId, isNew, limit, offset);
            result.message = 'Success';
            res.status(200).json(result);
        } catch (e: any) {
            logger.reportResponseErr(req.url, req.method, e.message);
            res.status(500).json({ message: 'Server Error' });
        }
    } else {
        try {
            const result = await books.getAllBooks(limit, offset);
            result.message = 'Success';
            res.status(200).json(result);
        } catch (e: any) {
            logger.reportResponseErr(req.url, req.method, e.message);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

const bookDetailCotroller: RequestHandler = async (req, res, next) => {
    const { bookId } = req.params;
    try {
        const result = await books.getBookDetail(bookId);
        result.message = 'Success';
        res.status(200).json(result);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

export { allBookController, bookDetailCotroller };