import { RequestHandler } from 'express';
import logger from '../../../shared/logger';
import jwt = require('jsonwebtoken');
import { myResponse, UserInfo, UserToken } from '../../../shared/type'
import util from '../../../shared/lib/util'
import jwtUtil from '../../../shared/lib/jwt'
import { getServiceInstance, UserService } from './user-service';

const userService: UserService = getServiceInstance();

const join: RequestHandler = async function (req, res, next) {
    const userInfo: UserInfo = req.body;
    try {
        const message = await userService.join(userInfo);
        res.status(200).json(util.makeResponse(null, message, null));
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        console.log(e);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

const login: RequestHandler = async function (req, res, next) {
    const loginInfo = req.body;
    try {
        let response: myResponse = {};
        const result = await userService.login(loginInfo);
        response = util.makeResponse(null, result.message, null);
        if (result.userId)
            res.cookie("token", jwtUtil.makeJwtToken(result.userId, loginInfo.email, loginInfo.name));
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

const matchEmailForReset: RequestHandler = async function (req, res, next) {
    const { email } = req.body;
    let message: string;

    try {
        const isValidEmail = await userService.isEmailMatch(email);
        if (isValidEmail)
            message = 'Success';
        else
            message = 'Failed';
        res.status(200).json(util.makeResponse(null, message, null));
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

const reset: RequestHandler = async function (req, res, next) {
    const { email, password } = req.body;
    let response: myResponse = {};
    try {
        let result = await userService.updatePassword(email, password);
        if (result)
            response = util.makeResponse(null, 'Success', null);
        else
            response = util.makeResponse(null, 'Failed', null);
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

let userController = { join, login, matchEmailForReset, reset };

export default userController;