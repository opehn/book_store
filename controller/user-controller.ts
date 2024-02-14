import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { users } from '../services';
import jwt from 'jsonwebtoken';

const join: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    const userInfo = req.body;
    try {
        let result = await users.join(userInfo);
        logger.reportResponse(req.url, req.method, result)
        res.status(200).json(result);
    } catch (e) {
        logger.reportResponseErr(req.url, req.method, e);
        res.status(500).json({ message: 'Server error' });
    }
}

const login: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    const loginInfo = req.body;

    try {
        let result = await users.login(loginInfo);
        if (result.message === 'Success') {
            const token = jwt.sign({
                userId: result.userId,
                email: loginInfo.email,
                name: loginInfo.name
            }, process.env.PRIVATE_KEY, {
                expiresIn: '30m',
                issuer: "Anna"
            });
            logger.reportResponse(req.url, req.method, result)
            res.cookie("token", token);
            res.status(200).json(result);
        }
        else
            res.status(400).json(result);
    } catch (e) {
        logger.reportResponseErr(req.url, req.method, e);
        res.status(500).json({ message: 'Server error' });
    }
}

const matchEmailForReset: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
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
        logger.reportResponse(req.url, req.method, result)
    } catch (e) {
        logger.reportResponseErr(req.url, req.method, e);
        res.status(500).json({ message: 'Server error' });
    }
}

const reset: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    const { password } = req.body;
    const { userId } = req.user;
    try {
        let result = await users.updatePassword(userId, password);
        logger.reportResponse(req.url, req.method, result)
        res.status(200).json(result);
    } catch (e) {
        logger.reportResponseErr(req.url, req.method, e);
        res.status(500).json({ message: 'Server error' });
    }
}

let userController = { join, login, matchEmailForReset, reset };

export default userController;