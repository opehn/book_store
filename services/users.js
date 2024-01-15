const { user } = require('../data/dbAccess');
const log = require('../shared/logger');

module.exports = {
    join: async function join(userInfo) {
        console.log('join');
        log.info('join started');
        try {
            let result = await user.getUserByEmail(userInfo.email);
            if (result.length) {
                return ({ message: 'Duplicate' });
            } else {
                await user.createNewUser(userInfo);
                return ({ message: 'Success' });
            }
        } catch (e) {
            console.log(`service error : ${e}`)
            throw (e);
        }
    },

    login: async function login(loginInfo) {

        //email로 유저 확인
        //없다면, 없는 유저라고 return
        //있다면, password 매칭
        //매칭되면 로그인

    }
}