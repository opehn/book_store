import users from './user-service';
import books from './books-service';
import category from './category-service';
import like from './like-service';
import cart from './cart-servcie';
import order from './order-service';

const users = {
    join: users.join,
    login: users.login,
    isEmailMatch: users.isEmailMatch,
    updatePassword: users.updatePassword,
}
books = {
    getAllBooks: books.getAllBooks,
    getBookDetail: books.getBookDetail,
    getBookByCategory: books.getBookByCategory,
}
category = {
    getAllCategory: category.getAllCategory,
}
like = {
    toggleLikeStatus: like.toggleLikeStatus,
}
cart = {
    updateCartItems: cart.updateCartItems,
    getCartItems: cart.getCartItems,
    deleteCartItems: cart.deleteCartItems,
}
order = {
    handlePayment: order.handlePayment,
    getOrderList: order.getOrderList,
    getOrderDetail: order.getOrderDetail,
}
export {
    users, books, category, like, cart, order
};