import express = require('express');
import dotenv = require('dotenv');
import logger from './shared/logger/index';
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import log from './middleware/loggerMiddleware'
const result = dotenv.config();
const cors = require('cors');

if (result.error) {
    logger.error('dotenv config error');
}

let app = express();

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