import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { cart } from '../services';
import { Result } from '../shared/type'
import { UserToken } from '../shared/type';

const getCartList: RequestHandler = async function (req, res, next) {
    let { userId } = req.user as UserToken;

    try {
        let result = await cart.getCartItems(userId);
        result.message = 'Success';
        res.status(200).json(result);
    } catch (e: any) {
        res.status(500).json({ message: 'Server error' });
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const addCart: RequestHandler = async function (req, res, next) {
    let { bookId, count } = req.body;
    let { userId } = req.user as UserToken;
    let sign = req.query.sign as string;
    try {
        let result = await cart.updateCartItems(userId, bookId, count, sign);
        result.message = "Success"
        res.status(200).json(result);
    } catch (e: any) {
        res.status(500).json({ message: 'Server error' });
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const deleteCart: RequestHandler = async function (req, res, next) {
    const { userId } = req.user as UserToken;
    const bookId = parseInt(req.params.bookId);
    try {
        let result: Result = {};
        result.data = await cart.deleteCartItems(userId, bookId);
        if (!result.data)
            result.message = 'Already deleted';
        else
            result.message = 'Success';
        res.status(200).json(result.message);
    } catch (e: any) {
        res.status(500).json({ message: 'Server error' });
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

let cartController = { getCartList, addCart, deleteCart };

export default cartController;
