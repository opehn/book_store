import knex from '../connection';
import logger from '../../shared/logger/index.js';
import util from '../dbUtil.js';
const userTable = 'USERS_TB';
import { LoginInfo } from '../../shared/type'

let getPasswordByEmail = async function getPasswordByEmail(loginInfo: any) {
    try {
        let passwordArray = await knex(userTable)
            .select('password')
            .where({ email: loginInfo.email });
        if (passwordArray.length)
            return passwordArray[0].password;
        else
            return null;
    } catch (e: any) {
        logger.reportDbErr(userTable, 'SELECT', e.message);
        throw e;
    }
}

export default {
    selectUserByEmail: async function selectUserByEmail(email: string) {
        try {
            let vals = await knex(userTable).where({ email: email });
            return vals;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'SELECT', e.message);
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
        } catch (e: any) {
            logger.reportDbErr(userTable, 'INSERT', e.messsage);
            throw e;
        }
    },

    //TODO : loginInfo 인터페이스 정의
    comparePassword: async function comparePassword(loginInfo: LoginInfo) {
        try {
            let hashedPassword = await getPasswordByEmail(loginInfo.email);
            let result = await util.comparePassword(loginInfo.password, hashedPassword);
            return result;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'SELECT', e.message);
            throw e;
        }
    },

    getPasswordByEmail,
    updatePassword: async function updatePassword(userId: number, newPassword: string) {
        try {

            let hashedPassword = await util.hashPassword(newPassword);
            let result = await knex(userTable).update({ password: hashedPassword })
                .where({ id: userId });
            return result;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'UPDATE', e.message);
            throw e;
        }
    }
}
