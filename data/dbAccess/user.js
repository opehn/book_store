const knex = require('../connection.js');
const logger = require('../../shared/logger');

module.exports = {
    getUserByEmail: async function getUserByEmail(email) {
        console.log('getUserByEmail');
        let users = 'USERS_TB'
        try {
            let vals = await knex(users).where({ email: email });
            return vals;
        } catch (e) {
            logger.error(`DB error : Failed to select user by email | ${e}`);
            throw e;
        }
    },

    createNewUser: async function createNewUser(userInfo) {
        let userTable = 'USERS_TB'
        console.log('createNewUser');

        try {
            let newUserId = await knex(userTable).insert(userInfo);
            logger.info(`Successfully Added To ${userTable}, ID : ${newUserId}`);
            return newUserId;
        } catch (e) {
            logger.error(`DB Error : Failed to Create new user in ${userTable} | ${e}`);
            throw e;
        }
    },

    isPasswordMatch: async function isPasswordMatch(loginInfo) {
        let userTable = 'USERS_TB';
        try {
            let matchUser = await knex(userTable)
                .where({ email: loginInfo.email })
                .andWhere({ password: loginInfo.password });
            return matchUser;
        } catch (e) {
            logger.error(`DB Error : Failed to select user by email / password | ${e}`);
            throw e;
        }
    }
}