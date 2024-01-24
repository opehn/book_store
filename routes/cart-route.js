const express = require('express');
const router = express.Router();
const { param, query } = require('express-validator');
const { books } = require('../services');
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

        ],
        async (req, res) => {

        })
    .delete('/:bookId', /* 장바구니 삭제 */
        [],
        async (req, res) => {

        })