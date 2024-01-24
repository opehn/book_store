const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { util } = require('../shared/lib');
const logger = require('../shared/logger');


/* 전체 조회 */
router.get('/',
    [
    ],
    async (req, res) => {

    })
    .post('/', /* 장바구니 담기 */
        [
            body('bookId').notEmpty().withMessage('No bookId')
                .isInt().withMessage('BookId is not int'),
            body('count').notEmpty().withMessage('No count')
                .isInt().withMessage('Count is not int'),
            util.validate,
            util.verifyToken

        ],
        async (req, res) => {
            let { email } = req.user;


        })
    .delete('/:bookId', /* 장바구니 삭제 */
        [],
        async (req, res) => {

        })

module.exports = router;