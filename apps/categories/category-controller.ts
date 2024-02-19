import { RequestHandler } from 'express';
import logger from '../../shared/logger';
import categoryDb from './category-db';
import { myResponse } from '../../shared/type'
import util from '../../shared/lib/util'

const getBookByCategory: RequestHandler = async function getGookByCategory(req, res, next) {
    let response: myResponse = {};
    try {
        let data = await categoryDb.getAllCategory();
        let message = util.makeMessage(data);
        response = util.makeResponse(null, message, null);
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
};

export default getBookByCategory;