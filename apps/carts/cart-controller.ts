import { RequestHandler } from 'express';
import logger from '../../shared/logger';
import cartDb from './cart-db'
import { Response } from '../../shared/type'
import { UserToken } from '../../shared/type';
import util from '../../shared/lib/util'
import { Cart } from '../../shared/type';


const getCartList: RequestHandler = async function (req, res, next) {
    let { userId } = req.user as UserToken;
    let response: Response = {};
    try {
        let data: Cart[] = await cartDb.selectCartByUser(userId);
        let message: string = util.makeMessage(data);
        response = util.makeResponse(data, message, null);
        res.status(200).json(response);
    } catch (e: any) {
        response = util.makeResponse(null, 'Error', e.message)
        res.status(500).json(response);
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const addCart: RequestHandler = async function (req, res, next) {
    let { bookId, count } = req.body;
    let { userId } = req.user as UserToken;
    let sign = req.query.sign as string;
    let response: Response = {};
    try {
        let data = await cartDb.updateOrInsertCartItem(userId, bookId, count, sign);
        let message: string = util.makeMessage(data);
        response = util.makeResponse(null, message, null);
        res.status(200).json(response);
    } catch (e: any) {
        response = util.makeResponse(null, 'Error', e.message);
        res.status(500).json(response);
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const deleteCart: RequestHandler = async function (req, res, next) {
    const { userId } = req.user as UserToken;
    const bookId = parseInt(req.params.bookId);
    let response: Response = {};
    let message: string;

    //TODO : delte 함수 리턴값 확인
    try {
        let data = await cartDb.deleteCartItems(userId, bookId);
        if (!data)
            message = 'Already deleted';
        else
            message = 'Success';
        res.status(200).json(util.makeResponse(null, message, null));
    } catch (e: any) {
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

let cartController = { getCartList, addCart, deleteCart };

export default cartController;