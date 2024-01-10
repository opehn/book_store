const logger = require('../shared/logger');
const nconf = require('../config');
const dbConf = nconf.get('db');

const knex = require('knex')({
    client: dbConf.client,
    connection: {
        host: dbConf.host,
        user: dbConf.user,
        password: dbConf.password,
        database: dbConf.database,
    },
});

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

