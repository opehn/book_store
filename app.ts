import express = require('express');
let app = express();
import dotenv from 'dotenv';
import logger from './shared/logger/index';
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import { Request, Response, NextFunction } from 'express';

const result = dotenv.config();

if (result.error) {
    logger.error('dotenv config error');
}
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

export type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => void;
export { app };