"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var express_validator = require("express-validator");
var param = express_validator.param, query = express_validator.query;
var books_controller_1 = require("../controller/books-controller");
var lib_1 = require("../shared/lib");
router.get('/', [
    query('limit').notEmpty().withMessage('No limit'),
    query('offset').notEmpty().withMessage('No offset'),
    lib_1.default.validate
], books_controller_1.allBookController);
router.get('/:bookId', [
    param('bookId').notEmpty().withMessage('No bookId'),
    lib_1.default.validate,
], books_controller_1.bookDetailCotroller);
exports.default = router;
