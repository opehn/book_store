"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var express_validator = require("express-validator");
var param = express_validator.param, query = express_validator.query;
var books_controller_1 = require("./books-controller");
var jwt_1 = require("../../middleware/jwt");
router.get('/', [
    query('limit').notEmpty().withMessage('No limit'),
    query('offset').notEmpty().withMessage('No offset'),
    jwt_1.default.validate
], books_controller_1.getAllBooks);
router.get('/:bookId', [
    param('bookId').notEmpty().withMessage('No bookId'),
    jwt_1.default.validate,
    jwt_1.default.verifyToken
], books_controller_1.getBookDetail);
exports.default = router;
