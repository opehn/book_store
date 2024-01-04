const express = require('express');
const router = express.Router();
const conn = require('../../mariadb');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const lib = require('../../lib/util');

router.use(express.json());

router.post('/',
    [
        body('email')
            .notEmpty().withMessage('No email')
            .isEmail().withMessage('Wrong email'),
        body('password').notEmpty().withMessage('No password'),
        lib.validate
    ],
    (req, res, next) => {
        const { email, password } = req.body;

        conn.query()


        res.json({
            message: 'I got it!'
        })
    })

module.exports = router;