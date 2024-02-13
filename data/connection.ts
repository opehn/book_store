import nconf from '../config';
const dbConf = nconf.get('db');

import knex_ from 'knex'
const knex = knex_(dbConf);

export default knex;

