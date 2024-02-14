"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var express_validator_1 = require("express-validator");
var lib_1 = require("../shared/lib");
var user_controller_1 = require("../controller/user-controller");
router.post('/join', [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('No email')
        .isEmail().withMessage("Wrong email"),
    (0, express_validator_1.body)('password').notEmpty().withMessage('No password'),
    (0, express_validator_1.body)('name').notEmpty().withMessage('No name'),
    lib_1.default.validate
], user_controller_1.default.join)
    .post('/login', [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('No email')
        .isEmail().withMessage("Wrong email"),
    (0, express_validator_1.body)('password').notEmpty().withMessage('No password'),
    lib_1.default.validate
], user_controller_1.default.login);
router.post('/reset', [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('No email')
        .isEmail().withMessage("Wrong email"),
    lib_1.default.validate
], user_controller_1.default.matchEmailForReset)
    .put('/reset', [
    (0, express_validator_1.body)('password').notEmpty().withMessage('No password'),
    lib_1.default.validate,
    lib_1.default.verifyToken,
], user_controller_1.default.reset);
exports.default = router;
