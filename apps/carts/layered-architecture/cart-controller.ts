import { RequestHandler } from 'express';
import logger from '../../../shared/logger';
import { myResponse } from '../../../shared/type'
import { UserToken } from '../../../shared/type';
import util from '../../../shared/lib/util'
import { Cart } from '../../../shared/type';
import { getServiceInstance } from './cart-service';

const cartService = getServiceInstance();

const getCartList: RequestHandler = async function (req, res, next) {
    const { userId } = req.user as UserToken;
    let response: myResponse = {};
    try {
        let data: Cart[] = await cartService.getCartList(userId);
        let message: string = util.makeMessage(data);
        response = util.makeResponse(data, message, null);
        res.status(200).json(response);
    } catch (e: any) {
        response = util.makeResponse(null, 'Failed', e.message)
        res.status(500).json(response);
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const addCart: RequestHandler = async function (req, res, next) {
    const { bookId, count } = req.body;
    const { userId } = req.user as UserToken;
    const sign = req.query.sign as string;
    let response: myResponse = {};
    try {
        const result = await cartService.addCart(userId, bookId, count, sign);
        let code: string = util.makeCode(result);
        response = util.makeResponse(null, code, null);
        res.status(200).json(response);
    } catch (e: any) {
        response = util.makeResponse(null, 'Failed', e.message);
        res.status(500).json(response);
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const deleteCart: RequestHandler = async function (req, res, next) {
    const { cartId } = req.params;
    const cartIdNumber = parseInt(cartId)
    let message: string;

    try {
        let data = await cartService.deleteCart(cartIdNumber);
        if (!data)
            message = '이미 삭제된 항목입니다';
        else
            message = 'Success';
        res.status(200).json(util.makeResponse(null, message, null));
    } catch (e: any) {
        res.status(500).json(util.makeResponse(null, 'Failed', e.message));
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

let cartController = { getCartList, addCart, deleteCart };

export default cartController;