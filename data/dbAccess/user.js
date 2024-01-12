const { User } = require('../model');
const logger = require('../../shared/logger');
const { create } = require('nconf');

async function getUserByEmail(email) {
    try {
        let vals = await User.where({ 'email': email }).fetch({ require: false });
        return (vals);
    } catch (e) {
        logger.error(`DB error : ${e}`)
        throw (e);
    }
}

async function createNewUser(email, password) {
    try {
        let newUser = await new User({
            email: email,
            password: password,
        }).save();
        console.log(newUser);
    } catch (e) {
        console.log(`Failed to save data : ${e}`);
        throw (e);
    }
}

createNewUser('anna951', 1234);

module.exports = {
    get getUserByEmail() {
        return getUserByEmail;
    },
};