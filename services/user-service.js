const { userDb } = require('../data/dbAccess');

module.exports = {
    join: async function join(userInfo) {
        try {
            let matchedUser = await userDb.getUserByEmail(userInfo.email);
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

    login: async function login(loginInfo) {
        try {
            let matchedUser = await userDb.getUserByEmail(loginInfo.email);
            if (matchedUser.length) {
                let result = await userDb.getUserByEmailAndPassword(loginInfo);
                if (result)
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
            let matchedUser = await userDb.getUserByEmail(email);
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
            let result = await userDb.updatePassword(email, password);
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