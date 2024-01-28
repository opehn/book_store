const express = require('express');
const app = express();
const dotenv = require('dotenv');
const logger = require('./shared/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const result = dotenv.config();

if (result.error) {
    logger.error('dotenv config error');
}
app.use(bodyParser.json());
app.use(cookieParser());

const {
    users, books, category, like, cart
} = require('./routes');

app.use('/users', users);
app.use('/books', books);
app.use('/category', category);
app.use('/likes', like);
app.use('/carts', cart);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    logger.info(`Server is listening on ${app.get('port')}`);
})

module.exports = app; 