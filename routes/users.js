const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { users } = require('../services');
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
            res.status(200).json(result);
        } catch (e) {
            logger.error(`Request on ${req.url} failed | ${e}`);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .post('/login',
        [
            body('email')
                .notEmpty().withMessage('No email')
                .isEmail().withMessage(`Wrong email`),
            body('password').notEmpty().withMessage('No password'),
            lib.validate
        ],
        async (req, res, next) => {
            logger.info(`Received Request on ${req.url}`)
            const loginInfo = req.body;
            try {
                let result = await users.login(loginInfo);
                res.status(200).json(result);
            } catch (e) {
                logger.error(`Request on ${req.url} failed | ${e}`);
                res.status(500).json({ message: 'Server error' });
            }
        }
    )

router.post('/reset',
    [
        body('email')
            .notEmpty().withMessage('No email')
            .isEmail().withMessage(`Wrong email`),
        lib.validate
    ],
    async (req, res, next) => {
        logger.info(`Received Request on ${req.url}`)
        const { email } = req.body;
        try {
            let result = await users.isEmailMatch(email);
            res.status(200).json(result);
            logger.info(`Send response to ${req.url} : ${result}`)
        } catch (e) {
            logger.error(`Request on ${req.url} failed | ${e}`);
            res.status(500).json({ message: 'Server error' });
        }
    }
)

module.exports = router;