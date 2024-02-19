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
var logger_1 = require("../../shared/logger");
var user_db_1 = require("./user-db");
var util_1 = require("../../shared/lib/util");
var jwt_1 = require("../../shared/lib/jwt");
var join = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, response, message, result, matchedUser, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInfo = req.body;
                    response = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, user_db_1.default.selectUserByEmail(userInfo.email)];
                case 2:
                    matchedUser = _a.sent();
                    if (!util_1.default.isArrayNotEmpty(matchedUser)) return [3 /*break*/, 3];
                    message = 'Duplicate';
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, user_db_1.default.createNewUser(userInfo)];
                case 4:
                    result = _a.sent();
                    message = util_1.default.makeMessage(result);
                    _a.label = 5;
                case 5:
                    res.status(200).json(util_1.default.makeResponse(null, message, null));
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    logger_1.default.reportResponseErr(req.url, req.method, e_1.message);
                    res.status(500).json(util_1.default.makeResponse(null, 'Error', e_1.message));
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
};
var login = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var loginInfo, response, matchedUser, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loginInfo = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    response = {};
                    return [4 /*yield*/, user_db_1.default.selectUserByEmail(loginInfo.email)];
                case 2:
                    matchedUser = _a.sent();
                    if (!util_1.default.isArrayNotEmpty(matchedUser)) return [3 /*break*/, 4];
                    return [4 /*yield*/, user_db_1.default.matchPassword(loginInfo)];
                case 3:
                    if (_a.sent()) {
                        res.cookie("token", jwt_1.default.makeJwtToken(matchedUser[0].id, matchedUser[0].email, matchedUser[0].name));
                        response = util_1.default.makeResponse(matchedUser, 'Success', null);
                    }
                    else
                        response = util_1.default.makeResponse(null, 'Password not matched', null);
                    return [3 /*break*/, 5];
                case 4:
                    response = util_1.default.makeResponse(null, 'Email not matched', null);
                    _a.label = 5;
                case 5:
                    res.status(200).json(response);
                    return [3 /*break*/, 7];
                case 6:
                    e_2 = _a.sent();
                    logger_1.default.reportResponseErr(req.url, req.method, e_2.message);
                    res.status(500).json(util_1.default.makeResponse(null, 'Error', e_2.message));
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
};
var matchEmailForReset = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var email, response, matchedUser, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    response = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user_db_1.default.selectUserByEmail(email)];
                case 2:
                    matchedUser = _a.sent();
                    if (util_1.default.isArrayNotEmpty(matchedUser)) {
                        response.message = 'Success';
                        res.cookie("token", jwt_1.default.makeJwtToken(matchedUser[0].id, matchedUser[0].email, matchedUser[0].name));
                        res.status(200).json(response.message);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    logger_1.default.reportResponseErr(req.url, req.method, e_3.message);
                    res.status(500).json(util_1.default.makeResponse(null, 'Error', e_3.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var reset = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var password, userId, response, result, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = req.body.password;
                    userId = req.user.userId;
                    response = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user_db_1.default.updatePassword(userId, password)];
                case 2:
                    result = _a.sent();
                    if (result)
                        response = util_1.default.makeResponse(null, 'Success', null);
                    //TODOV 
                    else
                        response = util_1.default.makeResponse(null, '?', null);
                    res.status(200).json(response);
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    logger_1.default.reportResponseErr(req.url, req.method, e_4.message);
                    res.status(500).json(util_1.default.makeResponse(null, 'Error', e_4.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var userController = { join: join, login: login, matchEmailForReset: matchEmailForReset, reset: reset };
exports.default = userController;
