const endpoints = {
    account: '/api/createAccount',
    verifyLogin: '/api/verifyLogin',
    productsList: '/api/productsList',
    searchProduct: '/api/searchProduct',
    getUser: '/api/getUserDetailByEmail',
    deleteUser: '/api/deleteAccount',
};

const cardData = {
    nameOnCard: 'Test User',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2027'
};

module.exports = { endpoints, cardData };