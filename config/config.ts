import nconf = require('nconf');
import path = require('path');
import logger from '../shared/logger';

const loadNconf = async function loadNconf() {
    logger.info('Start config');

    const baseConfigPath = __dirname;

    await nconf.argv()
        .env()
        .file('conf', path.join(baseConfigPath, 'config.json'));
}

//TODO : init 파일 만들기
loadNconf();

export default nconf;