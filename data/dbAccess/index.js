const user = module.require('./user.js');

module.exports = {
    get getUserByEmail() {
        return user.getUserByEmail;
    },
    get createNuewUser() {
        return user.createNewUser;
    }
};