const users = require('./users')


module.exports = {
    users: {
        join: users.join,
        login: users.login,
        isEmailMatch: users.isEmailMatch,
    }
};