import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { order } from '../services';
import { Result } from '../shared/type'
import { UserToken } from '../shared/type';

const getOrderList: RequestHandler = async function (req, res, next) {
    let result: Result = {};
    let { userId } = req.user as UserToken;
    try {
        result.data = await order.getOrderList(userId);
        result.message = 'Success';
        res.status(200).json(result);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const getOrderDetail: RequestHandler = async function (req, res, next) {
    let { userId } = req.user as UserToken;
    let orderId = parseInt(req.params.orderId);
    let result: Result = {};
    try {
        result.data = await order.getOrderDetail(userId, orderId);
        result.message = 'Success';
        res.status(200).json(result);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const orderPayment: RequestHandler = async function (req, res, next) {
    let { userId } = req.user as UserToken;
    let result: Result = {};

    try {
        await order.handlePayment(userId, req.body);
        result.message = 'Success';
        res.status(200).json(result);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}


let orderController = { getOrderList, getOrderDetail, orderPayment }

export default orderController;