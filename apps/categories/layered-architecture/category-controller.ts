import { RequestHandler } from 'express';
import logger from '../../../shared/logger';
import { MyResponse } from '../../../shared/type'
import util from '../../../shared/lib/util'
import { getServiceInstance } from './category-service';

const categoryService = getServiceInstance();

const getAllCategory: RequestHandler = async function getAllCategory(req, res, next) {
    let response: MyResponse = {};
    try {
        let data = await categoryService.getAllCategory();
        let errCode = util.makeCodeByArray(data);
        response = util.makeResponse(data, null, errCode);
        res.status(200).json(data);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ error: 'Failed' });
    }
};

export default getAllCategory;