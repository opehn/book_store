"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = exports.like = exports.users = void 0;
var user_service_1 = require("../apps/users/user-service");
exports.users = user_service_1.default;
var like_service_1 = require("../apps/like/like-service");
exports.like = like_service_1.default;
var order_service_1 = require("../apps/order/order-service");
exports.order = order_service_1.default;
