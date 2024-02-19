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
var connection_1 = require("../../data/connection");
var index_js_1 = require("../../shared/logger/index.js");
var dbUtil_js_1 = require("../../data/dbUtil.js");
var userTable = 'USERS_TB';
var getPasswordByEmail = function getPasswordByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordArray, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, connection_1.default)(userTable)
                            .select('password')
                            .where({ email: email })];
                case 1:
                    passwordArray = _a.sent();
                    if (passwordArray.length)
                        return [2 /*return*/, passwordArray[0].password];
                    else
                        return [2 /*return*/, null];
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    index_js_1.default.reportDbErr(userTable, 'SELECT', e_1.message);
                    throw e_1;
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.default = {
    selectUserByEmail: function selectUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function () {
            var vals, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, connection_1.default)(userTable).where({ email: email })];
                    case 1:
                        vals = _a.sent();
                        return [2 /*return*/, vals];
                    case 2:
                        e_2 = _a.sent();
                        index_js_1.default.reportDbErr(userTable, 'SELECT', e_2.message);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    createNewUser: function createNewUser(userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var hash_1, newUserId, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dbUtil_js_1.default.hashPassword(userInfo.password)];
                    case 1:
                        hash_1 = _a.sent();
                        userInfo.password = hash_1;
                        return [4 /*yield*/, (0, connection_1.default)(userTable).insert(userInfo)];
                    case 2:
                        newUserId = _a.sent();
                        index_js_1.default.info("Successfully Added To ".concat(userTable, ", ID : ").concat(newUserId));
                        return [2 /*return*/, newUserId];
                    case 3:
                        e_3 = _a.sent();
                        index_js_1.default.reportDbErr(userTable, 'INSERT', e_3.messsage);
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    matchPassword: function isPasswordMatch(loginInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, getPasswordByEmail(loginInfo.email)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, dbUtil_js_1.default.comparePassword(loginInfo.password, hashedPassword)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        e_4 = _a.sent();
                        index_js_1.default.reportDbErr(userTable, 'SELECT', e_4.message);
                        throw e_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    getPasswordByEmail: getPasswordByEmail,
    updatePassword: function updatePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dbUtil_js_1.default.hashPassword(newPassword)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, (0, connection_1.default)(userTable).update({ password: hashedPassword })
                                .where({ id: userId })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        e_5 = _a.sent();
                        index_js_1.default.reportDbErr(userTable, 'UPDATE', e_5.message);
                        throw e_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
