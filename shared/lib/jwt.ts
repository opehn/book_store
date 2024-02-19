import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';
import logger from '../logger';
import jwt = require('jsonwebtoken');
import { UserToken } from '../type';

function makeUser(userId: number, email: string, name: string): UserToken {
    return {
        userId: userId,
        email: email,
        name: name
    };
}

function makeJwtOption(expireTime: string, issuer: string) {
    return { expiresIn: expireTime, issuer: issuer }
}

function makeJwtToken(userId: string, email: string, name: string) {
    let user: UserToken = makeUser(parseInt(userId), email, name);
    let opt = makeJwtOption('30m', 'Anna');
    return jwt.sign(user, process.env.PRIVATE_KEY as any, opt);
}

const validate: RequestHandler = async function validate(req, res, next) {
    const err = validationResult(req);

    if (!err.isEmpty()) {
        //TODO : err 객체 정의 보고 message에 해당하는 부분 넣기
        logger.reportResponseErr(req.url, req.method, "error");
        return res.status(401).json(err.array())
    } else {
        return next();
    }
}

const verifyToken: RequestHandler = async function verifyToken(req, res, next) {
    const { token } = req.cookies;
    const secretKey = process.env.PRIVATE_KEY;
    if (!secretKey) {
        logger.reportResponseErr(req.url, req.method, "Env error : Can't get PRIVATE_KEY");
        return;
    }

    if (!token) {
        logger.reportResponse(req.url, req.method, 'Unauthorized');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        let decoded: any = jwt.verify(token, secretKey);
        console.log("decoded", decoded);
        let userInfo: UserToken = {
            userId: parseInt(decoded.userId),
            email: decoded.email,
            name: decoded.name,
        }
        console.log(userInfo.userId);
        req.user = userInfo;
        return next();
    } catch (e: any) {
        //TODO : 제대로 동작 안함. 찾아봐야 함
        if (e.name === 'JsonWebTokenError') {
            logger.reportResponse(req.url, req.method, 'Invalid token');
            return res.status(403).json({ message: 'Invalid token' });
        } else {
            logger.reportResponseErr(req.url, req.method, e.message);
            return res.status(500).json({ message: 'Server Error' });
        }
    }
}

export default {
    makeUser: makeUser,

    makeJwtOption: makeJwtOption,

    makeJwtToken: makeJwtToken,

    validate: validate,

    verifyToken: verifyToken
}