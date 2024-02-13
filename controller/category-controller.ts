import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { category } from '../services';

const getBookByCategory: RequestHandler;

export default {
    getBookByCategory: async function getBookByCategory(req, res, next) {
        logger.reportRequest(req.url, req.method);
        try {
            const result = await category.getAllCategory();
            if (result) {
                result.message = 'Success';
                logger.reportResponse(req.url, req.method, result)
                res.status(200).json(result);
            }
        } catch (e) {
            logger.reportResponseErr(req.url, req.method, e);
            res.status(500).json({ message: 'Server error' });
        }
    }

}