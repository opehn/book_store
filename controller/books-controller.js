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
exports.bookDetailCotroller = exports.allBookController = void 0;
var books = require('../services').books;
var logger_1 = require("../shared/logger");
var allBookController = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, limit, offset, isNewParam, isNew, result, result, e_1, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.default.reportRequest(req.url, req.method);
                categoryId = req.query.categoryId;
                limit = parseInt(req.query.limit);
                offset = parseInt(req.query.offset);
                offset = limit * offset;
                if (!categoryId) return [3 /*break*/, 5];
                isNewParam = req.query.isNew;
                isNew = void 0;
                if (!isNewParam) {
                    result = { message: 'No Data' };
                    logger_1.default.reportResponse(req.url, req.method, result);
                    res.status(401).json(result);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                isNew = (isNewParam === 'true');
                return [4 /*yield*/, books.getBookByCategory(categoryId, isNew, limit, offset)];
            case 2:
                result = _a.sent();
                result.message = 'Success';
                logger_1.default.reportResponse(req.url, req.method, result);
                res.status(200).json(result);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                logger_1.default.reportReponseErr(req.url, req.method, e_1);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 8];
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, books.getAllBooks(limit, offset)];
            case 6:
                result = _a.sent();
                result.message = 'Success';
                logger_1.default.reportResponse(req.url, req.method, result);
                res.status(200).json(result);
                return [3 /*break*/, 8];
            case 7:
                e_2 = _a.sent();
                logger_1.default.reportReponseErr(req.url, req.method, e_2);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.allBookController = allBookController;
var bookDetailCotroller = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bookId, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.default.reportRequest(req.url, req.method);
                bookId = req.params.bookId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, books.getBookDetail(bookId)];
            case 2:
                result = _a.sent();
                result.message = 'Success';
                logger_1.default.reportResponse(req.url, req.method, result);
                res.status(200).json(result);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                logger_1.default.reportReponseErr(req.url, req.method, e_3);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.bookDetailCotroller = bookDetailCotroller;
