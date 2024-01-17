const nconf = require('../config');
const dbConf = nconf.get('db');

const knex = require('knex')({ dbConf });

module.exports = knex;

