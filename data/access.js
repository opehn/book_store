const { User } = require('./bookshelf');
const logger = require('../shared/logger');

async function getUserByEmail(email) {
    try {
        let vals = await User.where({ 'email': email }).fetch({ require: false });
    } catch (e) {
        logger.info(`DB error : ${e}`)
    }
    return (vals);
}

getUserByEmail('anna951', 1234);