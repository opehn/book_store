import * as express from 'express';
const router = express.Router();
import util from '../shared/lib/index';
import { checkSchema, ValidationChain } from 'express-validator';
import { paymentSchema } from './validation-schema';
import orderController from '../controller/order-controller';
import { RequestHandler } from 'express'

/* 주문 목록 조회 */
router.get('/',
    [
        util.verifyToken,
    ], orderController.getOrderList)
    .post('/', /* 결제 하기 */
        [
            //TODO : 괴랄함 해결하기..
            checkSchema(paymentSchema) as unknown as RequestHandler,
            util.validate,
            util.verifyToken,
        ], orderController.orderPayment)
    .get('/:orderId', /* 주문 상세 조회 */
        [
            util.verifyToken,
        ], orderController.getOrderDetail)
export default router;