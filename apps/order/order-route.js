"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var jwt_1 = require("../../shared/lib/jwt");
var express_validator_1 = require("express-validator");
var validation_schema_1 = require("../../routes/validation-schema");
var order_controller_1 = require("./order-controller");
/* 주문 목록 조회 */
router.get('/', [
    jwt_1.default.verifyToken,
], order_controller_1.default.getOrderList)
    .post('/', /* 결제 하기 */ [
    //TODO : 괴랄함 해결하기..
    (0, express_validator_1.checkSchema)(validation_schema_1.paymentSchema),
    jwt_1.default.validate,
    jwt_1.default.verifyToken,
], order_controller_1.default.orderPayment)
    .get('/:orderId', /* 주문 상세 조회 */ [
    jwt_1.default.verifyToken,
], order_controller_1.default.getOrderDetail);
exports.default = router;
