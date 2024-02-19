import knex from '../../data/connection';
import logger from '../../shared/logger/index.js';
import dbUtil from '../../data/dbUtil.js';
const userTable = 'USERS_TB';
import { LoginInfo, UserInfo } from '../../shared/type'
import { hash } from 'bcrypt';

let getPasswordByEmail = async function getPasswordByEmail(email: string) {
    try {
        let passwordArray = await knex(userTable)
            .select('password')
            .where({ email: email });
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

    createNewUser: async function createNewUser(userInfo: UserInfo) {
        try {
            let hash = await dbUtil.hashPassword(userInfo.password);
            userInfo.password = hash;
            let newUserId = await knex(userTable).insert(userInfo);
            logger.info(`Successfully Added To ${userTable}, ID : ${newUserId}`);
            return newUserId;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'INSERT', e.messsage);
            throw e;
        }
    },

    matchPassword: async function isPasswordMatch(loginInfo: LoginInfo) {
        try {
            let hashedPassword = await getPasswordByEmail(loginInfo.email);
            let result = await dbUtil.comparePassword(loginInfo.password, hashedPassword);
            return result;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'SELECT', e.message);
            throw e;
        }
    },

    getPasswordByEmail,
    updatePassword: async function updatePassword(userId: number, newPassword: string) {
        try {
            let hashedPassword = await dbUtil.hashPassword(newPassword);
            let result = await knex(userTable).update({ password: hashedPassword })
                .where({ id: userId });
            return result;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'UPDATE', e.message);
            throw e;
        }
    }
}
