import * as express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RequestHandler, Request } from 'express';

interface UserToken {
    userId: number,
    email: string,
    name: string
}

export interface JwtPayload {
    [key: string]: any;
    iss?: string | undefined;
    sub?: string | undefined;
    aud?: string | string[] | undefined;
    exp?: number | undefined;
    nbf?: number | undefined;
    iat?: number | undefined;
    jti?: string | undefined;
}

//TODO : jwtToken 타입 정의 보고
declare module 'express' {
    interface Request {
        user?: string | JwtPayload;
    }
}

export { express, Request, RequestHandler };