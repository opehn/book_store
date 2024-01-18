const users = require('./user-service');
const books = require('./books-service');


module.exports = {
    users: {
        join: users.join,
        login: users.login,
        isEmailMatch: users.isEmailMatch,
        updatePassword: users.updatePassword,
    },
    books: {
        getAllBooks: books.getAllBooks,
        getOneBook: books.getOneBook,
    }
};
