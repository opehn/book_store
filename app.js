"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var dotenv_1 = require("dotenv");
var index_1 = require("./shared/logger/index");
var body_parser_1 = require("body-parser");
var cookie_parser_1 = require("cookie-parser");
var result = dotenv_1.default.config();
if (result.error) {
    index_1.default.error('dotenv config error');
}
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
var routes_1 = require("./routes");
app.use('/users', routes_1.users);
app.use('/books', routes_1.books);
app.use('/category', routes_1.category);
app.use('/likes', routes_1.like);
app.use('/carts', routes_1.cart);
app.use('/orders', routes_1.order);
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    index_1.default.info("Server is listening on ".concat(app.get('port')));
});
module.exports = app;
