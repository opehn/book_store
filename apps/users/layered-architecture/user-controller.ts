import { RequestHandler } from 'express';
import logger from '../../../shared/logger';
import { MyResponse, UserToken } from '../../../shared/type'
import { UserInfo } from '../types';
import util from '../../../shared/lib/util'
import jwtUtil from '../../../shared/middleware/jwt'
import { getServiceInstance, UserService } from './user-service';

const userService: UserService = getServiceInstance();

const join: RequestHandler = async function (req, res, next) {
    const userInfo: UserInfo = req.body;
    try {
        const result = await userService.join(userInfo);
        res.status(200).json(util.makeResponse(null, result.message, result.err));
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ error: 'Failed' });
    }
}

const login: RequestHandler = async function (req, res, next) {
    const loginInfo = req.body;
    try {
        let response: MyResponse = {};
        let token;
        const result = await userService.login(loginInfo);
        if (result.userId) {
            token = jwtUtil.makeJwtToken(result.userId, loginInfo.email, loginInfo.name);
            res.cookie("token", token);
            res.status(200).json({ ...response, token: token });
        }
        else {
            response = util.makeResponse(null, result.message, result.err);
            res.status(401).json(response);
        }
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ error: 'Failed' });
    }
}

const matchEmailForReset: RequestHandler = async function (req, res, next) {
    const { email } = req.body;

    try {
        const isValidEmail = await userService.isEmailMatch(email);
        const errCode = util.makeCodeByNumber(isValidEmail)
        res.status(200).json(util.makeResponse(null, null, errCode));
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ error: 'Failed' });
    }
}

const reset: RequestHandler = async function (req, res, next) {
    const { password } = req.body;
    const { email } = req.user as UserToken;

    try {
        const result = await userService.updatePassword(email, password);
        const errCode = util.makeCodeByNumber(result);
        res.status(200).json({ err: errCode });
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ error: 'Failed' });
    }
}

let userController = { join, login, matchEmailForReset, reset };

export default userController;