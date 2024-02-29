import { RequestHandler } from 'express';
import logger from '../../shared/logger';
import { MyResponse } from '../../shared/type.js'
import util from '../../shared/lib/util';
import { getBookInstance } from './book-integration';
import { BookDTO, BookDetailDTO, GetBookParams } from './types';

const BookIntegration = getBookInstance();

function makeParams(query: any) {
    let limit = parseInt(query.limit as string);
    let offset = parseInt(query.offset as string);
    offset = limit * offset;

    return {
        categoryId: parseInt(query.categoryId as string),
        limit: limit,
        offset: offset,
        isNew: query.isNew === 'true' ? true : false
    }
}

const getAllBooks: RequestHandler = async (req, res, next) => {
    let params: GetBookParams = makeParams(req.query);
    let bookData: BookDTO[];
    let response: MyResponse = {};

    if (params.categoryId) {
        try {
            bookData = await BookIntegration.getBookByCategory(params);
            response = util.makeResponse(bookData, null, 'Success');
            res.status(200).json(response);
        } catch (e: any) {
            logger.reportResponseErr(req.url, req.method, e.message);
            res.status(500).json(util.makeResponse(null, null, 'Failed'));
        }
    } else {
        try {
            bookData = await BookIntegration.getBookNoCategory(params.limit, params.offset);
            response = util.makeResponse(bookData, null, 'Success');
            res.status(200).json(response);
        } catch (e: any) {
            logger.reportResponseErr(req.url, req.method, e.messsage);
            res.status(500).json({ error: 'Failed' });
        }
    }
}

const getBookDetail: RequestHandler = async (req, res, next) => {
    const { bookId } = req.params;
    let response: MyResponse = {};
    try {
        const bookData = await BookIntegration.getBookDetail(parseInt(bookId));
        response = util.makeResponse(bookData, null, 'Success');
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ error: 'Failed' });
    }
}

export { getAllBooks, getBookDetail };