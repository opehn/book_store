"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var index_1 = require("../shared/lib/index");
var express_validator_1 = require("express-validator");
var validation_schema_1 = require("./validation-schema");
var order_controller_1 = require("../controller/order-controller");
/* 주문 목록 조회 */
router.get('/', [
    index_1.default.verifyToken,
], order_controller_1.default.getOrderList)
    .post('/', /* 결제 하기 */ [
    //TODO : 괴랄함 해결하기..
    (0, express_validator_1.checkSchema)(validation_schema_1.paymentSchema),
    index_1.default.validate,
    index_1.default.verifyToken,
], order_controller_1.default.orderPayment)
    .get('/:orderId', /* 주문 상세 조회 */ [
    index_1.default.verifyToken,
], order_controller_1.default.getOrderDetail);
exports.default = router;
