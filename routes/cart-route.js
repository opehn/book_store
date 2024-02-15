"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var _a = require('express-validator'), body = _a.body, param = _a.param, query = _a.query;
var lib_1 = require("../shared/lib");
var cart_controller_1 = require("../controller/cart-controller");
/* 전체 조회 */
router.get('/', [
    lib_1.default.verifyToken
], cart_controller_1.default.getCartList)
    .post('/', /* 장바구니 담기 */ [
    body('bookId').notEmpty().withMessage('No bookId')
        .isInt().withMessage('BookId is not int'),
    body('count').notEmpty().withMessage('No count')
        .isInt().withMessage('Count is not int'),
    query('sign').notEmpty().withMessage('No sign'),
    lib_1.default.validate,
    lib_1.default.verifyToken
], cart_controller_1.default.addCart)
    .delete('/:bookId', /* 장바구니 삭제 */ [
    param('bookId').isInt().withMessage('BookId need to be int'),
    lib_1.default.verifyToken
], cart_controller_1.default.deleteCart);
exports.default = router;
