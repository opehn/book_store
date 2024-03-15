//Set env variables
import dotenv = require('dotenv');

const result = dotenv.config();

if (result.error) {
    logger.error('dotenv config error');
}

import express = require('express');
import logger from './shared/logger/index';
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import log from './shared/middleware/loggerMiddleware'
import cors = require('cors');

let app = express();

app.use(cors({
    origin: 'http://localhost:4000', // 허용할 출처
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(log.requestLog);
app.use(log.responseLog);

import {
    users, books, category, like, cart, order
} from './routes/index';

app.use('/users', users);
app.use('/books', books);
app.use('/category', category);
app.use('/likes', like);
app.use('/carts', cart);
app.use('/orders', order)

app.options('/users/join', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'POST'); // 허용되는 HTTP 메서드
    res.send();
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    logger.info(`Server is listening on ${app.get('port')}`);
})

export { app };