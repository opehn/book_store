"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var logger_1 = require("../logger");
var jsonwebtoken_1 = require("jsonwebtoken");
exports.default = {
    validate: function validate(req, res, next) {
        var route = req.originalUrl;
        var err = (0, express_validator_1.validationResult)(req);
        if (!err.isEmpty()) {
            logger_1.default.reportResponseErr(req.url, req.method, err);
            return res.status(401).json(err.array());
        }
        else {
            return next();
        }
    },
    verifyToken: function verifyToken(req, res, next) {
        var token = req.cookies.token;
        var secretKey = process.env.PRIVATE_KEY;
        if (!token) {
            result = { messge: 'Unauthorized' };
            logger_1.default.reportResponse(req.url, req.method, result);
            return res.status(401).json(result);
        }
        try {
            var decoded = jsonwebtoken_1.default.verify(token, secretKey);
            req.user = decoded;
            return next();
        }
        catch (e) {
            //TODO : 제대로 동작 안함. 찾아봐야 함
            if (e.name === 'JsonWebTokenError') {
                result = { message: 'Invalid token' };
                logger_1.default.reportResponse(req.url, req.method, result);
                return res.status(403).json(result);
            }
            else {
                result = { message: 'Server Error' };
                logger_1.default.reportResponseErr(req.url, req.method, e);
                return res.status(500).json({ message: 'Server Error' });
            }
        }
    },
};
