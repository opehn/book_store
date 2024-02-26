import { RequestHandler } from 'express';
import logger from '../../shared/logger';
import categoryDb from './category-db';
import { myResponse } from '../../shared/type'
import util from '../../shared/lib/util'

function makeNewCategory(id: number | null, name: string) {
    return { id: id, name: name };
}

const getBookByCategory: RequestHandler = async function getGookByCategory(req, res, next) {
    let response: myResponse = {};
    try {
        let data = await categoryDb.getAllCategory();
        let message = util.makeMessage(data);
        //response = util.makeResponse(data, message, null);
        res.status(200).json(data);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
};

export default getBookByCategory;