const users = require('./user-service');
const books = require('./books-service');
const category = require('./category-service');
const like = require('./like-service');
const cart = require('./cart-servcie');
const order = require('./order-service');

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
    },
    cart: {
        updateCartItems: cart.updateCartItems,
        getCartItems: cart.getCartItems,
        deleteCartItems: cart.deleteCartItems,
    },
    order: {
        handlePayment: order.handlePayment,
        getOrderList: order.getOrderList,
    }
};
