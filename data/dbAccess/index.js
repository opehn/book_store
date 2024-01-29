const userDb = require('./user-db');
const bookDb = require('./book-db');
const categoryDb = require('./category-db');
const likeDb = require('./like-db');
const cartDb = require('./cart-db');
const orderDb = require('./order-db');

module.exports = {
    userDb: {
        getUserByEmail: userDb.getUserByEmail,
        createNewUser: userDb.createNewUser,
        getUserByEmailAndPassword: userDb.getUserByEmailAndPassword,
        updatePassword: userDb.updatePassword,
    },
    bookDb: {
        getAllBooks: bookDb.getAllBooks,
        getBookById: bookDb.getBookById,
        getBookByCategory: bookDb.getBookByCategory,
    },
    categoryDb: {
        getAllCategory: categoryDb.getAllCategory,
    },
    likeDb: {
        insertLikedUser: likeDb.insertLikedUser,
        deleteLikedUser: likeDb.deleteLikedUser
    },
    cartDb: {
        updateOrInsertCartItem: cartDb.updateOrInsertCartItem,
        selectCartByUser: cartDb.selectCartByUser,
        deleteCartItems: cartDb.deleteCartItems,
    },
    orderDb: {
        insertOrderAndDeleteCart: orderDb.insertOrderAndDeleteCart,
    }

}