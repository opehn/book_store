const express = require('express');
const app = express();
const dotenv = require('dotenv');
const logger = require('./shared/logger');

const result = dotenv.config();

if (result.error) {
    logger.error('dotenv config error');
}

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    logger.info(`Server is listening on ${app.get('port')}`);
})


app.use('./', routes);
module.exports = app; 