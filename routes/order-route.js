const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { util } = require('../shared/lib');
const logger = require('../shared/logger');


/* 주문 목록 조회 */
router.get('/',
    [
        util.verifyToken,
    ],
    async (req, res) => {
        let { email } = req.user;

        try {

        } catch (e) {

        }
    })
    .post('/', /* 결제 하기 */
        [
            body('items').isArray().withMessage('items need to be array'),
            body('items.*.bookId').isNumeric().withMessage('bookId need to be number'),
            body('items.*.count').isNumeric().withMessage('count need to be number'),
            body('delivery.address').notEmpty().withMessage('No address'),
            body('delivery.receiver').notEmpty().withMessage('No receiver'),
            body('delivery.contact').isMobilePhone('any').withMessage('Contact format error'),
            //TODO : 000-0000-0000 패턴으로 변경
            //body('delivery.contact').matches('/^\d{3}-\d{3,4}-\d{4}$/', 'g').withMessage('Contact format error'),
            body('delivery.totalPrice').isNumeric().withMessage('Price need to be number'),
            util.validate,
            util.verifyToken,
        ],
        async (req, res) => {
            let { email } = req.user;
            let { items, delivery } = req.body;

            console.log(items)
            console.log(delivery)

            try {

            } catch (e) {

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