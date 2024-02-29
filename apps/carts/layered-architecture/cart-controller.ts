import { RequestHandler } from 'express';
import logger from '../../../shared/logger';
import { MyResponse } from '../../../shared/type'
import { UserToken } from '../../../shared/type';
import util from '../../../shared/lib/util'
import { Cart } from '../types';
import { getServiceInstance } from './cart-service';

const cartService = getServiceInstance();

const getCartList: RequestHandler = async function (req, res, next) {
    const { userId } = req.user as UserToken;
    let response: MyResponse = {};
    try {
        let data: Cart[] = await cartService.getCartList(userId);
        let errCode: string = util.makeCodeByArray(data);
        response = util.makeResponse(data, null, errCode);
        res.status(200).json(response);
    } catch (e: any) {
        res.status(500).json({ error: 'Failed' });
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const addCart: RequestHandler = async function (req, res, next) {
    const { bookId, count } = req.body;
    const { userId } = req.user as UserToken;
    const sign = req.query.sign as string;
    let response: MyResponse = {};
    try {
        const result = await cartService.addCart(userId, bookId, count, sign);
        let errCode: string = util.makeCodeByNumber(result);
        res.status(200).json({ error: errCode });
    } catch (e: any) {
        res.status(500).json({ error: 'Failed' });
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const deleteCart: RequestHandler = async function (req, res, next) {
    const { cartId } = req.params;
    const cartIdNumber = parseInt(cartId)
    let response: MyResponse;

    try {
        let data = await cartService.deleteCart(cartIdNumber);
        if (!data)
            response = util.makeResponse(null, '이미 삭제된 항목입니다', 'Success');
        else
            response = util.makeResponse(null, null, 'Success');
        res.status(200).json(response);
    } catch (e: any) {
        res.status(500).json({ meserrorsage: 'Failed' });
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

let cartController = { getCartList, addCart, deleteCart };

export default cartController;