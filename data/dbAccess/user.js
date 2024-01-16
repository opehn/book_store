const knex = require('../connection.js');
const logger = require('../../shared/logger');

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
            let matchUser = await knex(userTable)
                .where({ email: loginInfo.email })
                .andWhere({ password: loginInfo.password });
            return matchUser;
        } catch (e) {
            logger.error(`DB Error : Failed to select user by email / password | ${e}`);
            throw e;
        }
    },

    //    changeUserPassword: async function changeUserPassword(userInfo) {
    //        await knex(userTable).update



}