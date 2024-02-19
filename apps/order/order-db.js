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
var orderTable = 'ORDERS_TB';
var orderBookTable = 'ORDERED_BOOKS_TB';
var deliveryTable = 'DELIVERY_TB';
var cartItemsTable = 'CARTITEMS_TB';
exports.default = {
    selectOrderList: function selectOrderList(userId) {
        return __awaiter(this, void 0, void 0, function () {
            var orderList, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, connection_1.default)('ORDERS_TB as ot')
                                .select('created_at', 'book_title', 'total_count', 'total_price', 'delivery_id', 'address', 'receiver', 'contact').where('ot.user_id', userId)
                                .join('DELIVERY_TB as dt', 'dt.id', 'ot.delivery_id')];
                    case 1:
                        orderList = _a.sent();
                        return [2 /*return*/, orderList];
                    case 2:
                        e_1 = _a.sent();
                        index_js_1.default.reportDbErr(orderTable, 'select', e_1.message);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    insertOrderAndDeleteCart: function insertOrderAndDeleteCart(userId, orderData, bookIds) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var deliveryId, orderId, newItems;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, trx(deliveryTable)
                                                .insert({
                                                receiver: orderData.delivery.receiver,
                                                contact: orderData.delivery.contact,
                                                address: orderData.delivery.address,
                                                user_id: userId
                                            })];
                                        case 1:
                                            deliveryId = _a.sent();
                                            return [4 /*yield*/, trx(orderTable)
                                                    .insert({
                                                    user_id: userId,
                                                    delivery_id: deliveryId[0],
                                                    book_title: orderData.bookTitle,
                                                    total_price: orderData.totalPrice,
                                                    total_count: orderData.totalCount
                                                })];
                                        case 2:
                                            orderId = _a.sent();
                                            newItems = orderData.items.map(function (cur) { return ({
                                                'book_id': cur.bookId,
                                                'count': cur.count,
                                                'order_id': orderId
                                            }); });
                                            return [4 /*yield*/, trx(orderBookTable)
                                                    .insert(newItems)];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, trx(cartItemsTable)
                                                    .delete()
                                                    .where({ user_id: userId })
                                                    .whereIn('book_id', bookIds)];
                                        case 4:
                                            _a.sent();
                                            trx.commit;
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        index_js_1.default.reportDbErr('Mutiple Table', 'Transaction', e_2.message);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    selectOrderDetail: function selectOrderDetail(userId, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, connection_1.default)('ORDERED_BOOKS_TB as ot')
                            .select('ot.book_id', 'title', 'author', 'price', 'count')
                            .where({ order_id: orderId })
                            .join('BOOKS_TB as bt', 'id', 'ot.book_id')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    }
};