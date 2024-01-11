const nconf = require('nconf');
const logger = require('../shared/logger');
const path = require('path');

const loadNconf = function loadNconf() {
    logger.info('Start config');

    const baseConfigPath = __dirname;

    nconf.argv();
    nconf.file('conf', path.join(baseConfigPath, 'config.json'));

}

//TODO : init 파일 만들기
loadNconf();

module.exports = nconf;


