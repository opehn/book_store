"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express = require("express");
var dotenv = require("dotenv");
var index_1 = require("./shared/logger/index");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var loggerMiddleware_1 = require("./middleware/loggerMiddleware");
var result = dotenv.config();
if (result.error) {
    index_1.default.error('dotenv config error');
}
var app = express();
exports.app = app;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(loggerMiddleware_1.default.requestLog);
var index_2 = require("./routes/index");
app.use('/users', index_2.users);
app.use('/books', index_2.books);
app.use('/category', index_2.category);
app.use('/likes', index_2.like);
app.use('/carts', index_2.cart);
app.use('/orders', index_2.order);
app.use(loggerMiddleware_1.default.responseLog);
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    index_1.default.info("Server is listening on ".concat(app.get('port')));
});
