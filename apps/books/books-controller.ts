import { RequestHandler } from 'express';
import logger from '../../shared/logger';
import { myResponse } from '../../shared/type.js'
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
    let response: myResponse = {};

    if (params.categoryId) {
        try {
            bookData = await BookIntegration.getBookByCategory(params);
            response = util.makeResponse(bookData, 'Success', null);
            res.status(200).json(response);
        } catch (e: any) {
            logger.reportResponseErr(req.url, req.method, e.message);
            res.status(500).json({ message: 'Server Error' });
        }
    } else {
        try {
            bookData = await BookIntegration.getBookNoCategory(params.limit, params.offset);
            response = util.makeResponse(bookData, 'Success', null);
            res.status(200).json(response);
        } catch (e: any) {
            logger.reportResponseErr(req.url, req.method, e.messsage);
            res.status(500).json(util.makeResponse(null, 'Error', e.message));
        }
    }
}

const getBookDetail: RequestHandler = async (req, res, next) => {
    const { bookId } = req.params;
    let response: myResponse = {};
    try {
        const bookData = await BookIntegration.getBookDetail(parseInt(bookId));
        response = util.makeResponse(bookData, 'Success', null);
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

export { getAllBooks, getBookDetail };