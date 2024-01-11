const bookshelf = require('./connection');

const User = bookshelf.Model.extend({
    tableName: 'USERS_TB'
});

const CartItem = bookshelf.Model.extend({
    tableName: 'CARTITEMS_TB'
});

const Category = bookshelf.Model.extend({
    tableName: 'CATEGORY_TB'
});

const Delivery = bookshelf.Model.extend({
    tableName: 'DELIVERY_TB'
});

const Likes = bookshelf.Model.extend({
    tableName: 'LIKES_TB'
});

const Orders = bookshelf.Model.extend({
    tableName: 'ORDERS_TB'
});

const Books = bookshelf.Model.extend({
    tableName: 'BOOKS_TB'
});

module.exports = {
    User,
    CartItem,
    Category,
    Delivery,
    Likes,
    Orders
} 