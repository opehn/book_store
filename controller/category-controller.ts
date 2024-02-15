import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { category } from '../services';
import { Result } from '../shared/type'

const getBookByCategory: RequestHandler = async function getGookByCategory(req, res, next) {
    logger.reportRequest(req.url, req.method);
    let result: Result = {};
    try {
        result.data = await category.getAllCategory();
        if (result.data) {
            result.message = 'Success';
            logger.reportResponse(req.url, req.method, result)
            res.status(200).json(result);
        }
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export default getBookByCategory;