import logger from '../logger/index'
import { RequestHandler, Send, Response, NextFunction } from 'express'

const requestLog: RequestHandler = async function reportRequest(req, res, next) {
    logger.reportRequest(req.url, req.method);
    next();
}

// const responseLog: RequestHandler = async function reportResponse(req, res, next) {
//     next();
//     logger.reportResponse(req.url, req.method, res.body);
// }

// const responseLog: RequestHandler = function reportResponse(req, res, next) {
//     // 응답이 완전히 처리되고 클라이언트에게 전송된 후에 로깅을 수행합니다.
//     res.on('finish', function() {
//         // 여기서 req.url, req.method, res.statusCode, res.get('Content-Type') 등을 사용하여 로깅을 수행할 수 있습니다.
//         // 예: logger.reportResponse(req.url, req.method, res.statusCode, res.get('Content-Type'));
//         logger.reportResponse(req.url, req.method, res.body);
//     });

//     next();
// }

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