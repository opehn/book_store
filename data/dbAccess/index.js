"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartDb = exports.likeDb = exports.categoryDb = void 0;
var category_db_1 = require("../../apps/categories/category-db");
exports.categoryDb = category_db_1.default;
var like_db_1 = require("../../apps/like/like-db");
exports.likeDb = like_db_1.default;
var cart_db_1 = require("../../apps/carts/cart-db");
exports.cartDb = cart_db_1.default;
