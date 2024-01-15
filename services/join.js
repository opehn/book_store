const { dbAccess } = require('../data');
const { user } = dbAccess;

moudle.exports = {
    join: async function join(userInfo) {
        let result = user.getUserByEmail(userInfo.email);
        console.log(typeof (result));
        try {
            if (result.length) {
                return ({ message: 'Duplicate' });
            } else {
                return ({ message: 'Success' });
            }
        } catch (e) {
            return ({ message: 'Error' });
        }
    }
}