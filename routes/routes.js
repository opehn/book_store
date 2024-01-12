const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const jwt = require('jsonwebtoken');

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

        //TODO : 컨트롤러 코드 작성 
        //const result = await 
        res.status(200).json(userData);
    })

module.exports = router;