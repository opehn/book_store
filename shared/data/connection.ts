import nconf from '../../config/index';
const dbConf = nconf.get('db');

import knex_ from 'knex'
const knex = knex_(dbConf);

export default knex;

