const http = require('http');

const logger = require('./logger');

const server = http.createServer((req, res) => {
    res.end('<p>Hello Server!</p>')
})

server.listen(8080);
server.on('listening', () => {
    logger.info('Sever is listening on 8080 port');
})

server.on('error', (error) => {
    logger.error(error);
})