"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var category_controller_1 = require("./layered-architecture/category-controller");
router.get('/', category_controller_1.default);
exports.default = router;
