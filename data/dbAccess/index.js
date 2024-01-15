const user = require('./user.js');

module.exports = {
    user: {
        getUserByEmail: user.getUserByEmail,
        createNewUser: user.createNewUser
    }
}