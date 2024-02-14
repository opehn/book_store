"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var dbConf = config_1.default.get('db');
var knex_1 = require("knex");
var knex = (0, knex_1.default)(dbConf);
exports.default = knex;
