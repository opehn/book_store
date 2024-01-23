const users = require('./user-service');
const books = require('./books-service');
const category = require('./category-service');
const like = require('./like-service');


module.exports = {
    users: {
        join: users.join,
        login: users.login,
        isEmailMatch: users.isEmailMatch,
        updatePassword: users.updatePassword,
    },
    books: {
        getAllBooks: books.getAllBooks,
        getBookDetail: books.getBookDetail,
        getBookByCategory: books.getBookByCategory,
    },
    category: {
        getAllCategory: category.getAllCategory,
    },
    like: {
        toggleLikeStatus: like.toggleLikeStatus,
    }
};
