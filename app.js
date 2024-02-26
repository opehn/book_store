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
var cors = require('cors');
if (result.error) {
    index_1.default.error('dotenv config error');
}
var app = express();
exports.app = app;
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:4000', // 허용할 출처
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
    credentials: true
}));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:4000'); // 클라이언트의  도메인
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, application/json');
//     next();
// })
app.use(bodyParser.json());
app.use(cookieParser());
app.use(loggerMiddleware_1.default.requestLog);
app.use(loggerMiddleware_1.default.responseLog);
var index_2 = require("./routes/index");
app.use('/users', index_2.users);
app.use('/books', index_2.books);
app.use('/category', index_2.category);
app.use('/likes', index_2.like);
app.use('/carts', index_2.cart);
app.use('/orders', index_2.order);
app.options('/users/join', function (req, res) {
    res.header('Access-Control-Allow-Methods', 'POST'); // 허용되는 HTTP 메서드
    res.send();
});
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    index_1.default.info("Server is listening on ".concat(app.get('port')));
});
