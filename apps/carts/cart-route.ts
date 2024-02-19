import express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
import jwtUtil from '../../shared/lib/jwt';
import cartController from './cart-controller';

/* 전체 조회 */
router.get('/',
    [
        jwtUtil.verifyToken
    ],
    cartController.getCartList)
    .post('/', /* 장바구니 담기 */
        [
            body('bookId').notEmpty().withMessage('No bookId')
                .isInt().withMessage('BookId is not int'),
            body('count').notEmpty().withMessage('No count')
                .isInt().withMessage('Count is not int'),
            query('sign').notEmpty().withMessage('No sign'),
            jwtUtil.validate,
            jwtUtil.verifyToken
        ],
        cartController.addCart)
    .delete('/:bookId', /* 장바구니 삭제 */
        [
            param('bookId').isInt().withMessage('BookId need to be int'),
            jwtUtil.verifyToken
        ],
        cartController.deleteCart)

export default router;