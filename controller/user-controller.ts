import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { users } from '../services';
import jwt = require('jsonwebtoken');
import { Result } from '../shared/type'

const join: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    const userInfo = req.body;
    let result: Result = {};
    try {
        result.message = await users.join(userInfo);
        logger.reportResponse(req.url, req.method, result.message)
        res.status(200).json(result.message);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const login: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    const loginInfo: any = req.body;
    try {
        let result: Result = {};
        result = await users.login(loginInfo);
        let user = {
            userId: result.data.id,
            email: result.data.email,
            name: result.data.name
        }
        if (result.message === 'Success') {
            const token = jwt.sign(user, process.env.PRIVATE_KEY as any, {
                expiresIn: '30m',
                issuer: "Anna"
            });
            logger.reportResponse(req.url, req.method, result.message)
            res.cookie("token", token);
            res.status(200).json(result.message);
        }
        else
            res.status(400).json(result);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const matchEmailForReset: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    const { email } = req.body;
    let result: Result = {};
    try {
        result.data = await users.isEmailMatch(email);
        if (result.data.length) {
            result.message = 'Success';
            const token = jwt.sign({
                email: email,
            }, process.env.PRIVATE_KEY as any, {
                expiresIn: '30m',
                issuer: "Anna"
            });
            res.cookie("token", token);
            res.status(200).json(result.message);
            logger.reportResponse(req.url, req.method, result.message)
        }
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const reset: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    const { password } = req.body;
    const { userId } = req.user as any;
    let result: Result = {};
    try {
        result.data = await users.updatePassword(userId, password);
        result.data ? result.message = 'Success' : result.message = 'Failed';
        logger.reportResponse(req.url, req.method, result.message)
        res.status(200).json(result.message);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ message: 'Server error' });
    }
}

let userController = { join, login, matchEmailForReset, reset };

export default userController;