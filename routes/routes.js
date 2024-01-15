const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const join = require('../services');
const lib = require('../shared/lib');

router.post('/join',
    [
        body('email')
            .notEmpty().withMessage('No email')
            .isEmail().withMessage('Wrong email'),
        body('password').notEmpty().withMessage('No password'),
        body('name').notEmpty().withMessage('No name'),
        body('address').notEmpty().withMessage('No address'),
        lib.validate
    ],
    (req, res, next) => {
        const userInfo = req.body;

        let result = join.join();
        console.log(result);
        res.status(200).json(result);
    })

module.exports = router;