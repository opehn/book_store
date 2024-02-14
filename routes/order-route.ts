import * as express from 'express';
const router = express.Router();
import util from '../shared/lib/index';
import { checkSchema, ValidationChain } from 'express-validator';
import { paymentSchema } from './validation-schema';
import orderController from '../controller/order-controller';

/* 주문 목록 조회 */
router.get('/',
    [
        util.verifyToken,
    ], orderController.getOrderList)
    .post('/', /* 결제 하기 */
        [
            checkSchema(paymentSchema),
            util.validate,
            util.verifyToken,
        ], orderController.orderPayment)
    .get('/:orderId', /* 주문 상세 조회 */
        [
            util.verifyToken,
        ], orderController.getOrderDetail)
module.exports = router;