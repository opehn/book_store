const { user } = require('../data/dbAccess');
const { getUserByEmail } = require('../data/dbAccess/user');

module.exports = {
    join: async function join(userInfo) {
        try {
            let matchedUser = await user.getUserByEmail(userInfo.email);
            if (matchedUser.length) {
                return { message: 'Duplicate' };
            } else {
                await user.createNewUser(userInfo);
                return { message: 'Success' };
            }
        } catch (e) {
            throw e;
        }
    },

    //TODO : 비밀번호 암호화
    login: async function login(loginInfo) {
        try {
            let matchedUser = await user.getUserByEmail(loginInfo.email);
            if (matchedUser.length) {
                let result = await user.getUserByEmailAndPassword(loginInfo);
                if (result.length)
                    return { message: 'Success' };
                else
                    return { message: 'Password not matched' }
            } else {
                return { message: 'Email not matched' }
            }
        } catch (e) {
            throw e;
        }
    },

    isEmailMatch: async function isEmailMatch(email) {
        try {
            let matchedUser = await user.getUserByEmail(email);
            if (matchedUser.length) {
                return { message: 'Success' };
            } else {
                return { message: 'Failed' };
            }
        } catch (e) {
            throw e;
        }
    },
    updatePassword: async function updatePassword(email, password) {
        try {
            let result = await user.updatePassword(email, password);
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