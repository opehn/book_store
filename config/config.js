const nconf = require('nconf');
const logger = require('../shared/logger');
const path = require('path');

const loadNconf = function loadNconf() {
    logger.info('Start config');

    const baseConfigPath = __dirname;
    console.log(baseConfigPath);

    nconf.argv();
    nconf.file('conf', path.join(baseConfigPath, 'config.json'));

    console.log(nconf.conf)
}

module.exports = loadNconf;


