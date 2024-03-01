"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var express_validator_1 = require("express-validator");
var jwt_1 = require("../../middleware/jwt");
var like_controller_1 = require("./like-controller");
router.put('/:bookId', [
    (0, express_validator_1.param)('bookId').isInt().withMessage('No BookID'),
    (0, express_validator_1.query)('liked').notEmpty().withMessage('No liked'),
    jwt_1.default.verifyToken
], like_controller_1.default);
exports.default = router;
