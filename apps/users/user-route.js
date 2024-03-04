"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var express_validator_1 = require("express-validator");
var jwt_1 = require("../../middleware/jwt");
var user_controller_1 = require("./layered-architecture/user-controller");
router.post('/join', [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('No email')
        .isEmail().withMessage("Wrong email"),
    (0, express_validator_1.body)('password').notEmpty().withMessage('No password'),
    jwt_1.default.validate
], user_controller_1.default.join)
    .post('/login', [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('No email')
        .isEmail().withMessage("Wrong email"),
    (0, express_validator_1.body)('password').notEmpty().withMessage('No password'),
    jwt_1.default.validate
], user_controller_1.default.login);
router.post('/reset', [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('No email')
        .isEmail().withMessage("Wrong email"),
    jwt_1.default.validate,
], user_controller_1.default.matchEmailForReset)
    .put('/reset', [
    (0, express_validator_1.body)('password').notEmpty().withMessage('No password'),
    jwt_1.default.validate,
    jwt_1.default.verifyToken
], user_controller_1.default.reset);
exports.default = router;
