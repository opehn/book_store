import { RequestHandler } from 'express';
import logger from '../../../shared/logger';
import { OrderService, getServiceInstance } from './order-service';
import { UserOrder, Order } from '../types';
import { MyResponse } from '../../../shared/type'
import { UserToken } from '../../../shared/type';
import util from '../../../shared/lib/util'

const orderService: OrderService = getServiceInstance();

const getOrderList: RequestHandler = async function (req, res, next) {
    let response: MyResponse = {};
    let { userId } = req.user as UserToken;

    try {
        const data: UserOrder[] = await orderService.getOrderList(userId);
        const errCode = util.makeCodeByArray(data);
        response = util.makeResponse(data, null, errCode);
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ error: 'Failed' });
    }
}

const getOrderDetail: RequestHandler = async function (req, res, next) {
    let { userId } = req.user as UserToken;
    let orderId = parseInt(req.params.orderId);
    let response: MyResponse = {};

    try {
        const data: UserOrder[] = await orderService.getOrderDetail(userId, orderId);
        const errCode: string = util.makeCodeByArray(data);
        response = util.makeResponse(data, null, errCode);
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ error: 'Failed' });
    }
}

const orderPayment: RequestHandler = async function (req, res, next) {
    let { userId } = req.user as UserToken;
    let orderData: Order = req.body as Order;

    try {
        await orderService.handlePayment(userId, orderData);
        res.status(200).json({ error: 'Success' });
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ error: 'Failed' });
    }
}

let orderController = { getOrderList, getOrderDetail, orderPayment }

export default orderController;