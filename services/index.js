const users = require('./user-service')


module.exports = {
    users: {
        join: users.join,
        login: users.login,
        isEmailMatch: users.isEmailMatch,
        updatePassword: users.updatePassword,
    }
};