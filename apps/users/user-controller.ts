import { RequestHandler } from 'express';
import logger from '../../shared/logger';
import userDb from './user-db';
import jwt = require('jsonwebtoken');
import { myResponse, UserInfo, UserToken } from '../../shared/type'
import util from '../../shared/lib/util'
import jwtUtil from '../../shared/lib/jwt'

const join: RequestHandler = async function (req, res, next) {
    const userInfo: UserInfo = req.body;
    let result;
    let message: string;
    try {
        let matchedUser = await userDb.selectUserByEmail(userInfo.email);
        if (util.isArrayNotEmpty(matchedUser))
            message = 'Duplicate';
        else {
            result = await userDb.createNewUser(userInfo);
            message = util.makeMessage(result);
        }
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
        let matchedUser = await userDb.selectUserByEmail(loginInfo.email);
        if (util.isArrayNotEmpty(matchedUser)) {
            if (await userDb.matchPassword(loginInfo)) {
                res.cookie("token", jwtUtil.makeJwtToken(matchedUser[0].id, matchedUser[0].email, matchedUser[0].name));
                response = util.makeResponse(null, 'Success', null);
            }
            else
                response = util.makeResponse(null, 'Password not matched', null);
        } else {
            response = util.makeResponse(null, 'Email not matched', null);
        }
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

const matchEmailForReset: RequestHandler = async function (req, res, next) {
    const { email } = req.body;
    let response: myResponse = {};
    try {
        let matchedUser = await userDb.selectUserByEmail(email);
        if (util.isArrayNotEmpty(matchedUser)) {
            response.message = 'Success';
            res.cookie("token", jwtUtil.makeJwtToken(matchedUser[0].id, matchedUser[0].email, matchedUser[0].name));
            res.status(200).json(response.message);
        }
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

const reset: RequestHandler = async function (req, res, next) {
    const { password } = req.body;
    let { userId } = req.user as UserToken;
    let response: myResponse = {};
    try {
        let result = await userDb.updatePassword(userId, password);
        if (result)
            response = util.makeResponse(null, 'Success', null);
        //TODOV 
        else
            response = util.makeResponse(null, '?', null);
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

let userController = { join, login, matchEmailForReset, reset };

export default userController;