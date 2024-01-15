const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const users = require('../services');
const lib = require('../shared/lib');
const logger = require('../shared/logger');

router.post('/join',
    [
        body('email')
            .notEmpty().withMessage('No email')
            .isEmail().withMessage(`Wrong email`),
        body('password').notEmpty().withMessage('No password'),
        body('name').notEmpty().withMessage('No name'),
        lib.validate
    ],
    async (req, res, next) => {
        logger.info(`Received Request on ${req.url}`)
        const userInfo = req.body;
        try {
            let result = await users.join(userInfo);
            console.log(result);
            res.status(200).json(result);
        } catch (e) {
            logger.error(`Request on '/join' failed `);
            console.log(e);
            res.status(500).json({ message: 'Server error' });
        }
    })

module.exports = router;