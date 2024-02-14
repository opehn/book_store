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
var connection_1 = require("../connection");
var index_js_1 = require("../../shared/logger/index.js");
var cartTable = 'CARTITEMS_TB';
exports.default = {
    selectCartByUser: function selectCartByUser(userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, connection_1.default)('CARTITEMS_TB as ct')
                                .select('ct.id', 'ct.book_id', 'bt.title', 'bt.summary', 'bt.img', 'bt.price', 'ct.count')
                                .join('BOOKS_TB as bt', 'bt.id', '=', 'ct.book_id')
                                .where({ 'ct.user_id': userId })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_1 = _a.sent();
                        index_js_1.default.reportDbErr(cartTable, 'INSERT', e_1);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    updateOrInsertCartItem: function updateOrInsertCartItem(userId, bookId, count, sign) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queryString = void 0;
                        if (sign === 'plus')
                            queryString =
                                'INSERT INTO CARTITEMS_TB (book_id, count, user_id)\
                VALUES (?, ?, ?)\
                ON DUPLICATE KEY UPDATE count = count + VALUES(count)';
                        else
                            queryString =
                                'INSERT INTO CARTITEMS_TB (book_id, count, user_id)\
                VALUES (?, ?, ?)\
                ON DUPLICATE KEY UPDATE count = CASE\
                WHEN count > 0 THEN count - VALUES(count)\
                ELSE count\
                END';
                        return [4 /*yield*/, connection_1.default.raw(queryString, [bookId, count, userId])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[0]];
                    case 2:
                        e_2 = _a.sent();
                        index_js_1.default.reportDbErr(cartTable, 'INSERT', e_2);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    deleteCartItems: function deleteCartItems(userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, connection_1.default)(cartTable).delete()
                                .where({ 'user_id': userId })
                                .andWhere({ 'book_id': bookId })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_3 = _a.sent();
                        index_js_1.default.reportDbErr(cartTable, 'INSERT', e_3);
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};
