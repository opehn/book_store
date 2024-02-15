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
var logger_1 = require("../shared/logger");
var services_1 = require("../services");
var jwt = require("jsonwebtoken");
var join = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, result, _a, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger_1.default.reportRequest(req.url, req.method);
                    userInfo = req.body;
                    result = {};
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = result;
                    return [4 /*yield*/, services_1.users.join(userInfo)];
                case 2:
                    _a.message = _b.sent();
                    logger_1.default.reportResponse(req.url, req.method, result.message);
                    res.status(200).json(result.message);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    logger_1.default.reportResponseErr(req.url, req.method, e_1.message);
                    res.status(500).json({ message: 'Server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var login = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var loginInfo, result, user, token, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.default.reportRequest(req.url, req.method);
                    loginInfo = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    result = {};
                    return [4 /*yield*/, services_1.users.login(loginInfo)];
                case 2:
                    result = _a.sent();
                    user = {
                        userId: result.data.id,
                        email: result.data.email,
                        name: result.data.name
                    };
                    if (result.message === 'Success') {
                        token = jwt.sign(user, process.env.PRIVATE_KEY, {
                            expiresIn: '30m',
                            issuer: "Anna"
                        });
                        logger_1.default.reportResponse(req.url, req.method, result.message);
                        res.cookie("token", token);
                        res.status(200).json(result.message);
                    }
                    else
                        res.status(400).json(result);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    logger_1.default.reportResponseErr(req.url, req.method, e_2.message);
                    res.status(500).json({ message: 'Server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var matchEmailForReset = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email, result, _a, token, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger_1.default.reportRequest(req.url, req.method);
                    email = req.body.email;
                    result = {};
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = result;
                    return [4 /*yield*/, services_1.users.isEmailMatch(email)];
                case 2:
                    _a.data = _b.sent();
                    if (result.data.length) {
                        result.message = 'Success';
                        token = jwt.sign({
                            email: email,
                        }, process.env.PRIVATE_KEY, {
                            expiresIn: '30m',
                            issuer: "Anna"
                        });
                        res.cookie("token", token);
                        res.status(200).json(result.message);
                    }
                    logger_1.default.reportResponse(req.url, req.method, result.message);
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _b.sent();
                    logger_1.default.reportResponseErr(req.url, req.method, e_3.message);
                    res.status(500).json({ message: 'Server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var reset = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var password, userId, result, _a, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger_1.default.reportRequest(req.url, req.method);
                    password = req.body.password;
                    userId = req.user.userId;
                    result = {};
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = result;
                    return [4 /*yield*/, services_1.users.updatePassword(userId, password)];
                case 2:
                    _a.data = _b.sent();
                    result.data ? result.message = 'Success' : result.message = 'Failed';
                    logger_1.default.reportResponse(req.url, req.method, result.message);
                    res.status(200).json(result.message);
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _b.sent();
                    logger_1.default.reportResponseErr(req.url, req.method, e_4.message);
                    res.status(500).json({ message: 'Server error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var userController = { join: join, login: login, matchEmailForReset: matchEmailForReset, reset: reset };
exports.default = userController;
