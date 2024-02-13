import knex from '../connection';
import logger from '../../shared/logger/index.js';
import util from '../dbUtil.js';

const userTable = 'USERS_TB';

export default {
    selectUserByEmail: async function selectUserByEmail(email: string) {
        try {
            let vals = await knex(userTable).where({ email: email });
            return vals;
        } catch (e) {
            logger.reportDbErr(userTable, 'SELECT', e);
            throw e;
        }
    },

    //TODO : userInfo 인터페이스 정의
    createNewUser: async function createNewUser(userInfo: any) {
        try {
            let hash = await util.hashPassword(userInfo.password);
            userInfo.password = hash;
            let newUserId = await knex(userTable).insert(userInfo);
            logger.info(`Successfully Added To ${userTable}, ID : ${newUserId}`);
            return newUserId;
        } catch (e) {
            logger.reportDbErr(userTable, 'INSERT', e);
            throw e;
        }
    },

    //TODO : loginInfo 인터페이스 정의
    comparePassword: async function comparePassword(loginInfo: any) {
        try {
            let hashedPassword = await module.exports.getPasswordByEmail(loginInfo);
            let result = await util.comparePassword(loginInfo.password, hashedPassword);
            return result;
        } catch (e) {
            logger.reportDbErr(userTable, 'SELECT', e);
            throw e;
        }
    },

    getPasswordByEmail: async function getPasswordByEmail(loginInfo: any) {
        try {
            let passwordArray = await knex(userTable)
                .select('password')
                .where({ email: loginInfo.email });
            if (passwordArray.length)
                return passwordArray[0].password;
            else
                return null;
        } catch (e) {
            logger.reportDbErr(userTable, 'SELECT', e);
            throw e;
        }
    },
    updatePassword: async function updatePassword(userId: number, newPassword: string) {
        try {

            let hashedPassword = await util.hashPassword(newPassword);
            let result = await knex(userTable).update({ password: hashedPassword })
                .where({ id: userId });
            return result;
        } catch (e) {
            logger.reportDbErr(userTable, 'UPDATE', e);
            throw e;
        }
    }
}
