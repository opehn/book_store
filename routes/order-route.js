const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { checkSchema } = require('express-validator');
const { order } = require('../services');
const { util } = require('../shared/lib');
const logger = require('../shared/logger');
const paymentSchema = require('./validation-schema');

console.log(paymentSchema)

/* 주문 목록 조회 */
router.get('/',
    [
        util.verifyToken,
    ],
    async (req, res) => {
        let { email } = req.user;
        logger.reportRequest(req.url, req.method);
        try {

        } catch (e) {

        }
    })
    .post('/', /* 결제 하기 */
        [
            checkSchema(paymentSchema),
            util.validate,
            util.verifyToken,
        ],
        async (req, res) => {
            logger.reportRequest(req.url, req.method);
            let { email } = req.user;
            let { items, delivery } = req.body;

            try {
                let result = {};
                await order.handlePayment(email, items, delivery);
                result.message = 'Success'
                logger.reportResponse(req.url, req.method, result);
                res.status(200).json(result);
            } catch (e) {
                logger.reportReponseErr(req.url, req.method, e);
            }
        })
    .get('/:orderId', /* 주문 상세 조회 */
        [
            util.verifyToken,
        ],
        async (req, res) => {
            let { email } = req.user;
            let { orderId } = req.params;


            try {

            } catch (e) {

            }

        })
module.exports = router;