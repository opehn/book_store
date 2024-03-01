"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var _a = require('express-validator'), body = _a.body, param = _a.param, query = _a.query;
var jwt_1 = require("../../middleware/jwt");
var cart_controller_1 = require("./layered-architecture/cart-controller");
/* 전체 조회 */
router.get('/', [
    jwt_1.default.verifyToken
], cart_controller_1.default.getCartList)
    .post('/', /* 장바구니 담기 */ [
    body('bookId').notEmpty().withMessage('No bookId')
        .isInt().withMessage('BookId is not int'),
    body('count').notEmpty().withMessage('No count')
        .isInt().withMessage('Count is not int'),
    query('sign').notEmpty().withMessage('No sign'),
    jwt_1.default.validate,
    jwt_1.default.verifyToken
], cart_controller_1.default.addCart)
    .delete('/:cartId', /* 장바구니 삭제 */ [
    param('cartId').isInt().withMessage('BookId need to be int'),
    jwt_1.default.verifyToken
], cart_controller_1.default.deleteCart);
exports.default = router;
