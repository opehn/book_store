import express = require('express');

const router = express.Router();
const { body, param, query } = require('express-validator');
import util from '../shared/lib';
import cartController from '../controller/cart-controller';

/* 전체 조회 */
router.get('/',
    [
        util.verifyToken
    ],
    cartController.getCartList)
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
        cartController.addCart)
    .delete('/:bookId', /* 장바구니 삭제 */
        [
            param('bookId').isInt().withMessage('BookId need to be int'),
            util.verifyToken
        ],
        cartController.deleteCart)

export default router;