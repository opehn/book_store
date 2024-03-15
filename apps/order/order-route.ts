import * as express from 'express';
const router = express.Router();
import jwtUtil from '../../shared/middleware/jwt';
import { checkSchema, ValidationChain } from 'express-validator';
import { paymentSchema } from '../../routes/validation-schema';
import orderController from './layered-architecture/order-controller';
//import orderController from './stratified-architecture/order-controller.str'
import { RequestHandler } from 'express'

/* 주문 목록 조회 */
router.get('/',
    [
        jwtUtil.verifyToken,
    ], orderController.getOrderList)
    .post('/', /* 결제 하기 */
        [
            //TODO : 괴랄함 해결하기..
            checkSchema(paymentSchema) as unknown as RequestHandler,
            jwtUtil.validate,
            jwtUtil.verifyToken,
        ], orderController.orderPayment)
    .get('/:orderId', /* 주문 상세 조회 */
        [
            jwtUtil.verifyToken,
        ], orderController.getOrderDetail)
export default router;