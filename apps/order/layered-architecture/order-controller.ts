import { RequestHandler } from 'express';
import logger from '../../../shared/logger';
import { OrderService, getServiceInstance } from './order-service';
import { UserOrder } from '../../../shared/type';
import { myResponse } from '../../../shared/type'
import { UserToken } from '../../../shared/type';
import util from '../../../shared/lib/util'
import { Order } from '../../../shared/type';

const orderService = getServiceInstance();

const getOrderList: RequestHandler = async function (req, res, next) {
    let response: myResponse = {};
    let { userId } = req.user as UserToken;

    try {
        let data: UserOrder[] = await orderService.getOrderList(userId);
        let message = util.makeMessage(data);
        response = util.makeResponse(data, message, null);
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

const getOrderDetail: RequestHandler = async function (req, res, next) {
    let { userId } = req.user as UserToken;
    let orderId = parseInt(req.params.orderId);
    let response: myResponse = {};

    try {
        let data: UserOrder[] = await orderService.getOrderDetail(userId, orderId);
        let message: string = util.makeMessage(data);
        response = util.makeResponse(data, message, null);
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

const orderPayment: RequestHandler = async function (req, res, next) {
    let { userId } = req.user as UserToken;
    let response: myResponse = {};
    let orderData: Order = req.body as Order;

    try {
        await orderService.handlePayment(userId, orderData);
        response = util.makeResponse(null, 'Success', null)
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

let orderController = { getOrderList, getOrderDetail, orderPayment }

export default orderController;