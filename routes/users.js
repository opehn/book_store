const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { users } = require('../services');
const { util } = require('../shared/lib');
const logger = require('../shared/logger');
const jwt = require('jsonwebtoken');

router.post('/join',
    [
        body('email')
            .notEmpty().withMessage('No email')
            .isEmail().withMessage(`Wrong email`),
        body('password').notEmpty().withMessage('No password'),
        body('name').notEmpty().withMessage('No name'),
        util.validate
    ],
    async (req, res, next) => {
        logger.info(`Received Request on ${req.url}`)
        const userInfo = req.body;
        try {
            let result = await users.join(userInfo);
            logger.info(`Send response to ${req.url} : ${result}`)
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
            util.validate
        ],
        async (req, res, next) => {
            logger.info(`Received Request on ${req.url}`)
            const loginInfo = req.body;

            try {
                let result = await users.login(loginInfo);
                if (result.message === 'Success') {
                    const token = jwt.sign({
                        email: loginInfo.email,
                        name: loginInfo.name
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '30m',
                        issuer: "Anna"
                    });
                    res.cookie("token", token);
                    res.status(200).json(result);
                }
                else
                    res.status(400).json(result);
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
        util.validate
    ],
    async (req, res, next) => {
        logger.info(`Received Request on ${req.url}`)
        const { email } = req.body;
        try {
            let result = await users.isEmailMatch(email);
            if (result.message === 'Success') {
                const token = jwt.sign({
                    email: email,
                }, process.env.PRIVATE_KEY, {
                    expiresIn: '30m',
                    issuer: "Anna"
                });
                res.cookie("token", token);
                res.status(200).json(result);
            }
            logger.info(`Send response to ${req.url} : ${result}`)
        } catch (e) {
            logger.error(`Request on ${req.url} failed | ${e}`);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .put('/reset',
        [
            body('password').notEmpty().withMessage('No password'),
            util.validate,
            util.verifyToken,
        ],
        async (req, res, next) => {
            logger.info(`Received Request on ${req.url}`)
            const { password } = req.body;
            const { email } = req.user;

            try {
                let result = await users.updatePassword(email, password);
                res.status(200).json(result);
                logger.info(`Send response to ${req.url} : ${result}`)
            } catch (e) {
                logger.error(`Request on ${req.url} failed | ${e}`);
                res.status(500).json({ message: 'Server error' });
            }
        }
    )

module.exports = router;