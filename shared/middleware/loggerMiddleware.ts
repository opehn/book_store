import logger from '../logger/index'
import { RequestHandler, Send, Response, NextFunction } from 'express'

const requestLog: RequestHandler = async function reportRequest(req, res, next) {
    logger.reportRequest(req.url, req.method);
    next();
}

const responseLog: RequestHandler = async function reportResponse(req, res, next) {
    const originalSend = res.send;
    res.send = (body?: any): Response => {
        logger.reportResponse(req.url, req.method, body);
        return originalSend.call(res, body);
    };

    next();
}

export default {
    requestLog: requestLog,
    responseLog: responseLog
}