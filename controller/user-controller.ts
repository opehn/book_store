import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { users } from '../services';
import jwt = require('jsonwebtoken');
import { Result, UserInfo, UserToken } from '../shared/type'

function makeUser(userId: number, email: string, name: string): UserToken {
    return { userId: userId, email: email, name: name };
}

function makeJwtOption(expireTime: string, issuer: string) {
    return { expiresIn: expireTime, issuer: issuer }
}

const join: RequestHandler = async function (req, res, next) {
    const userInfo: UserInfo = req.body;
    let result: Result = {};
    try {
        result.message = await users.join(userInfo);
        res.status(200).json(result.message);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const login: RequestHandler = async function (req, res, next) {
    const loginInfo = req.body;
    try {
        let result: Result = {};
        result = await users.login(loginInfo);
        let user: UserToken = makeUser(parseInt(result.data.id), result.data.email, result.data.name);
        let opt = makeJwtOption('30m', 'Anna');
        if (result.message === 'Success') {
            const token = jwt.sign(user, process.env.PRIVATE_KEY as any, opt);
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
    const { email } = req.body;
    let result: Result = {};
    try {
        result.data = await users.isEmailMatch(email);
        if (result.data.length) {
            result.message = 'Success';
            let user = makeUser(result.data[0].id, result.data[0].email, result.data[0].name);
            let opt = makeJwtOption('30m', 'Anna');
            const token = jwt.sign(user, process.env.PRIVATE_KEY as any, opt);
            res.cookie("token", token);
            res.status(200).json(result.message);
        }
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const reset: RequestHandler = async function (req, res, next) {
    const { password } = req.body;
    let userId;
    if (req.user)
        userId = req.user.userId;
    else //TODO : 에러 처리..
        return;
    let result: Result = {};
    console.log(userId)
    try {
        result.data = await users.updatePassword(userId, password);
        result.data ? result.message = 'Success' : result.message = 'Failed';
        res.status(200).json(result.message);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ message: 'Server error' });
    }
}

let userController = { join, login, matchEmailForReset, reset };

export default userController;