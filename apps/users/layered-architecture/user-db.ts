import knex from '../../../data/connection';
import logger from '../../../shared/logger/index.js';
import dbUtil from '../../../data/dbUtil.js';
import { LoginInfo, UserInfo } from '../../../shared/type'
const userTable = 'USERS_TB';

export class UserRepository {

    async selectPasswordByEmail(email: string) {
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

    async selectUserByEmail(email: string) {
        try {
            let vals = await knex(userTable).where({ email: email });
            return vals;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'SELECT', e.message);
            throw e;
        }
    }


    async insertUser(userInfo: UserInfo) {
        try {
            let newUserId = await knex(userTable).insert(userInfo);
            logger.info(`Successfully Added User To ${userTable}, ID : ${newUserId}`);
            return newUserId;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'INSERT', e.messsage);
            throw e;
        }
    }

    async updatePassword(userId: number, hashedPassword: string) {
        try {
            let result = await knex(userTable).update({ password: hashedPassword })
                .where({ id: userId });
            return result;
        } catch (e: any) {
            logger.reportDbErr(userTable, 'UPDATE', e.message);
            throw e;
        }
    }
}

export function getRepoInstance() {
    return new UserRepository();
}