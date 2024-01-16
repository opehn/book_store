const knex = require('../connection.js');
const logger = require('../../shared/logger');
const util = require('../dbUtil');
const { hash } = require('bcrypt');

const userTable = 'USERS_TB';

module.exports = {
    getUserByEmail: async function getUserByEmail(email) {
        try {
            let vals = await knex(userTable).where({ email: email });
            return vals;
        } catch (e) {
            logger.error(`DB error : Failed to select user by email | ${e}`);
            throw e;
        }
    },

    createNewUser: async function createNewUser(userInfo) {
        try {
            let hash = await util.hashPassword(userInfo.password);
            userInfo.password = hash;
            let newUserId = await knex(userTable).insert(userInfo);
            logger.info(`Successfully Added To ${userTable}, ID : ${newUserId}`);
            return newUserId;
        } catch (e) {
            logger.error(`DB Error : Failed to Create new user in ${userTable} | ${e}`);
            throw e;
        }
    },

    getUserByEmailAndPassword: async function getUserByEmailAndPassword(loginInfo) {
        try {
            let hashedPassword = await module.exports.getPasswordByEmail(loginInfo);
            let result = await util.comparePassword(loginInfo.password, hashedPassword);
            return result;
        } catch (e) {
            logger.error(`DB Error : Failed to select user by email / password | ${e}`);
            throw e;
        }
    },

    getPasswordByEmail: async function getPasswordByEmail(loginInfo) {
        try {
            let passwordArray = await knex(userTable)
                .select('password')
                .where({ email: loginInfo.email });
            if (passwordArray.length)
                return passwordArray[0].password;
            else
                return null;
        } catch (e) {
            logger.error(`DB Error : Failed to select user by email / password | ${e}`);
            throw e;
        }
    },
    updatePassword: async function updatePassword(email, newPassword) {
        try {
            let hashedPassword = util.hashPassword(newPassword);
            let result = await knex(userTable).update({ password: hashedPassword })
                .where({ email: email });
            return result;
        } catch (e) {
            logger.error(`DB Error : Failed to select user by email / password | ${e}`);
            throw e;
        }
    }
}
