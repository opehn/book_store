import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { order } from '../services';

const getOrderList: RequestHandler = async function (req, res, next) {
    let { userId } = req.user;
    logger.reportRequest(req.url, req.method);
    try {
        let result = {};
        result.data = await order.getOrderList(userId);
        result.message = 'Success';
        logger.reportResponse(req.url, req.method, result);
        res.status(200).json(result);
    } catch (e) {
        logger.reportResponseErr(req.url, req.method, e);
    }
}

const getOrderDetail: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    let { userId } = req.user;
    let { orderId } = req.params;
    try {
        let result = {};
        result.data = await order.getOrderDetail(userId, orderId);
        result.message = 'Success';
        logger.reportResponse(req.url, req.method, result);
        res.status(200).json(result);
    } catch (e) {
        logger.reportResponseErr(req.url, req.method, e);
    }
}

const orderPayment: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    let { userId } = req.user;

    try {
        let result = {};
        await order.handlePayment(userId, req.body);
        result.message = 'Success';
        logger.reportResponse(req.url, req.method, result);
        res.status(200).json(result);
    } catch (e) {
        logger.reportResponseErr(req.url, req.method, e);
    }
}


let orderController = { getOrderList, getOrderDetail, orderPayment }

export default orderController;