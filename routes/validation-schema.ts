
const paymentSchema = {
    items: {
        isArray: true,
        errorMessage: 'Items should be array'
    },
    'items.*.bookId': {
        isNumeric: true,
        errorMessage: 'BookId should be number'
    },
    'items.*.count': {
        isNumeric: true,
        errorMessage: 'Count should be number'
    },
    'delivery.address': {
        notEmpty: true,
        errorMessage: 'No Address'
    },
    'delivery.receiver': {
        notEmpty: true,
        errorMessage: 'No receiver'
    },
    'delivery.contact': {
        matches: {
            options: '^\\d{3}-\\d{3,4}-\\d{4}$',
            errorMessage: 'PhoneNumber format unmatch'
        }
    },
    totalPrice: {
        isNumeric: true,
        errorMessage: 'TotalPrice should be number'
    },
}

module.exports = paymentSchema; 