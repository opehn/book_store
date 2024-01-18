const userDb = require('./user-db.js');
const bookDb = require('./book-db.js');

module.exports = {
    user: {
        getUserByEmail: userDb.getUserByEmail,
        createNewUser: userDb.createNewUser,
        getUserByEmailAndPassword: userDb.getUserByEmailAndPassword,
        updatePassword: userDb.updatePassword,
    },
    bookDb: {
        getAllBooks: bookDb.getAllBooks,
        getBookById: bookDb.getBookById,
    }
}