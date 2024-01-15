const logger = require('../shared/logger');
const nconf = require('../config');
const dbConf = nconf.get('db');
const knex = require('knex')(dbConf);

//const bookshelf = require('bookshelf')(knex);

module.exports = knex;