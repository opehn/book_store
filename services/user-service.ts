import { userDb } from '../data/dbAccess';
import { LoginInfo, UserInfo } from '../shared/type'

export default {
    join: async function join(userInfo: UserInfo) {
        try {
            let matchedUser = await userDb.selectUserByEmail(userInfo.email);
            if (matchedUser.length) {
                return 'Duplicate';
            } else {

                await userDb.createNewUser(userInfo);
                return 'Success';
            }
        } catch (e) {
            throw e;
        }
    },

    login: async function login(loginInfo: LoginInfo) {
        try {
            let matchedUser = await userDb.selectUserByEmail(loginInfo.email);
            console.log('matchedUser', matchedUser)
            if (matchedUser.length) {
                let data = await userDb.comparePassword(loginInfo);
                if (data)
                    return {
                        data: matchedUser[0],
                        message: 'Success',
                    };
                else
                    return { message: 'Password not matched' }
            } else {
                return { message: 'Email not matched' }
            }
        } catch (e) {
            throw e;
        }
    },
    isEmailMatch: async function isEmailMatch(email: string) {
        try {
            return await userDb.selectUserByEmail(email);
        }
        catch (e) {
            throw e;
        }
    },
    updatePassword: async function updatePassword(userId: number, password: string) {
        try {
            console.log(`service userId : ${userId}`)
            return await userDb.updatePassword(userId, password);
        } catch (e) {
            throw e;
        }
    }
}