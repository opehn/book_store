const express = require('express');
const { cart } = require('../services');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { util } = require('../shared/lib');
const logger = require('../shared/logger');

/* 전체 조회 */
router.get('/',
    [
        util.verifyToken
    ],
    async (req, res) => {
        logger.reportRequest(req.url, req.method);
        let { email } = req.user;

        try {
            let result = await cart.getCartItems(email);
            result.message = 'Success';
            logger.reportResponse(req.url, req.method, result);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ message: 'Server error' });
            logger.reportReponseErr(req.url, req.method, e);
        }
    })
    .post('/', /* 장바구니 담기 */
        [
            body('bookId').notEmpty().withMessage('No bookId')
                .isInt().withMessage('BookId is not int'),
            body('count').notEmpty().withMessage('No count')
                .isInt().withMessage('Count is not int'),
            query('sign').notEmpty().withMessage('No sign'),
            util.validate,
            util.verifyToken
        ],
        async (req, res) => {
            logger.reportRequest(req.url, req.method);
            let { bookId, count } = req.body;
            let { email } = req.user;
            let { sign } = req.query;
            try {
                let result = await cart.updateCartItems(email, bookId, count, sign);
                result.message = "Success"
                logger.reportResponse(req.url, req.method, result);
                res.status(200).json(result);
            } catch (e) {
                res.status(500).json({ message: 'Server error' });
                logger.reportReponseErr(req.url, req.method, e);
            }
        })
    .delete('/:bookId', /* 장바구니 삭제 */
        [
            param('bookId').isInt().withMessage('BookId need to be int'),
            util.verifyToken
        ],
        async (req, res) => {
            logger.reportRequest(req.url, req.method);
            const { email } = req.user;
            const { bookId } = req.params;
            try {
                let message = {};
                let result = await cart.deleteCartItems(email, bookId);
                if (!result)
                    message.message = 'Already deleted';
                else
                    message.message = 'Success';
                res.status(200).json(message);
            } catch (e) {
                res.status(500).json({ message: 'Server error' });
                logger.reportReponseErr(req.url, req.method, e);
            }
        })

module.exports = router;