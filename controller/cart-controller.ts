import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { cart } from '../services';

const getCartList: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    let { userId } = req.user;

    try {
        let result = await cart.getCartItems(userId);
        result.message = 'Success';
        logger.reportResponse(req.url, req.method, result);
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
        logger.reportResponseErr(req.url, req.method, e);
    }
}

const addCart: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    let { bookId, count } = req.body;
    let { userId } = req.user;
    let sign = req.query.sign as string;
    try {
        let result = await cart.updateCartItems(userId, bookId, count, sign);
        result.message = "Success"
        logger.reportResponse(req.url, req.method, result);
        res.status(200).json(result);
    } catch (e: any) {
        res.status(500).json({ message: 'Server error' });
        logger.reportResponseErr(req.url, req.method, e.message);
    }
}

const deleteCart: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    const { userId } = req.user;
    const { bookId } = req.params;
    try {
        let message = {};
        let result = await cart.deleteCartItems(userId, bookId);
        if (!result)
            message.message = 'Already deleted';
        else
            message.message = 'Success';
        res.status(200).json(message);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
        logger.reportResponseErr(req.url, req.method, e);
    }
}

let cartController = { getCartList, addCart, deleteCart };

export default cartController;

