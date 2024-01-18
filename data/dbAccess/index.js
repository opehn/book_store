const user = require('./user-db.js');

module.exports = {
    user: {
        getUserByEmail: user.getUserByEmail,
        createNewUser: user.createNewUser,
        getUserByEmailAndPassword: user.getUserByEmailAndPassword,
        updatePassword: user.updatePassword,
    }
}