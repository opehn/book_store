import express, { Application } from 'express';
const app = express();
import dotenv from 'dotenv';
import logger from './shared/logger';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const result = dotenv.config();

if (result.error) {
    logger.error('dotenv config error');
}
app.use(bodyParser.json());
app.use(cookieParser());

import {
    users, books, category, like, cart, order
} from './routes');

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

module.exports = app; 