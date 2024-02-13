import { userDb } from '../data/dbAccess';

//TODO : userInfo, loginInfo 인터페이스 정의
export default {
    join: async function join(userInfo: any) {
        try {
            let matchedUser = await userDb.selectUserByEmail(userInfo.email);
            if (matchedUser.length) {
                return { message: 'Duplicate' };
            } else {

                await userDb.createNewUser(userInfo);
                return { message: 'Success' };
            }
        } catch (e) {
            throw e;
        }
    },

    login: async function login(loginInfo: any) {
        try {
            let matchedUser = await userDb.selectUserByEmail(loginInfo.email);
            if (matchedUser.length) {
                let result = await userDb.comparePassword(loginInfo);
                if (result)
                    return {
                        message: 'Success',
                        userId: matchedUser[0].id
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
            let matchedUser = await userDb.selectUserByEmail(email);
            if (matchedUser.length) {
                return { message: 'Success' };
            } else {
                return { message: 'Failed' };
            }
        } catch (e) {
            throw e;
        }
    },
    updatePassword: async function updatePassword(userId: number, password: string) {
        try {
            let result = await userDb.updatePassword(userId, password);
            if (result) {
                return { message: 'Success' };
            } else {
                return { message: 'Failed' };
            }
        } catch (e) {
            throw e;
        }
    }
}