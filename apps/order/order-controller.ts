import { RequestHandler } from 'express';
import logger from '../../shared/logger';
import orderService from './order-service';
import { UserOrder } from '../../shared/type';
import orderDb from './order-db';
import { Response } from '../../shared/type'
import { UserToken } from '../../shared/type';
import util from '../../shared/lib/util'
import { Order } from '../../shared/type';

const getOrderList: RequestHandler = async function (req, res, next) {
    let response: Response = {};
    let { userId } = req.user as UserToken;

    try {
        let data: UserOrder[] = await orderDb.selectOrderList(userId);
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
    let response: Response = {};

    try {
        let data: UserOrder[] = await orderDb.selectOrderDetail(userId, orderId);
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
    let response: Response = {};
    let orderData: Order = req.body as Order;

    try {
        let bookIds: number[] = await orderService.handlePayment(orderData);
        await orderDb.insertOrderAndDeleteCart(userId, orderData, bookIds);
        response = util.makeResponse(null, 'Success', null)
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

let orderController = { getOrderList, getOrderDetail, orderPayment }

export default orderController;