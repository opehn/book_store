"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var logger_1 = require("../logger");
var jwt = require("jsonwebtoken");
var validate = function validate(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var err;
        return __generator(this, function (_a) {
            err = (0, express_validator_1.validationResult)(req);
            if (!err.isEmpty()) {
                //TODO : err 객체 정의 보고 message에 해당하는 부분 넣기
                logger_1.default.reportResponseErr(req.url, req.method, "error");
                return [2 /*return*/, res.status(401).json(err.array())];
            }
            else {
                return [2 /*return*/, next()];
            }
            return [2 /*return*/];
        });
    });
};
var verifyToken = function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, secretKey, decoded, userInfo;
        return __generator(this, function (_a) {
            token = req.cookies.token;
            secretKey = process.env.PRIVATE_KEY;
            if (!secretKey) {
                logger_1.default.reportResponseErr(req.url, req.method, "Env error : Can't get PRIVATE_KEY");
                return [2 /*return*/];
            }
            if (!token) {
                logger_1.default.reportResponse(req.url, req.method, 'Unauthorized');
                return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
            }
            try {
                decoded = jwt.verify(token, secretKey);
                console.log("decoded", decoded);
                userInfo = {
                    userId: parseInt(decoded.userId),
                    email: decoded.email,
                    name: decoded.name,
                };
                console.log(userInfo.userId);
                req.user = userInfo;
                return [2 /*return*/, next()];
            }
            catch (e) {
                //TODO : 제대로 동작 안함. 찾아봐야 함
                if (e.name === 'JsonWebTokenError') {
                    logger_1.default.reportResponse(req.url, req.method, 'Invalid token');
                    return [2 /*return*/, res.status(403).json({ message: 'Invalid token' })];
                }
                else {
                    logger_1.default.reportResponseErr(req.url, req.method, e.message);
                    return [2 /*return*/, res.status(500).json({ message: 'Server Error' })];
                }
            }
            return [2 /*return*/];
        });
    });
};
var util = { validate: validate, verifyToken: verifyToken };
exports.default = util;
