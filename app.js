const express = require('express');
const app = express();
const dotenv = require('dotenv');
const logger = require('./logger');
const apis = require('./routes/controllers/index.js');

const result = dotenv.config();

if (result.error) {
    logger.error('dotenv config error');
} else {
    console.log(result.parsed);
}

app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.use('/join', apis.joinRouter);

app.listen(app.get('port'), () => {
    logger.info(`Server is listening on ${app.get('port')}`);
})