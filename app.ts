import express = require('express');
import dotenv = require('dotenv');
import logger from './shared/logger/index';
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');

const result = dotenv.config();

if (result.error) {
    logger.error('dotenv config error');
}

let app = express();
app.use(bodyParser.json());
app.use(cookieParser());

import {
    users, books, category, like, cart, order
} from './routes/index';

app.use('/users', users);
app.use('/books', books);
app.use('/category', category);
app.use('/likes', like);
app.use('/carts', cart);
app.use('/orders', order)

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    logger.info(`Server is listening on ${app.get('port')}`);
})

export { app };