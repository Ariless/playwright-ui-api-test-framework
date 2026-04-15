const endpoints = {
    account: '/api/createAccount',
    verifyLogin: '/api/verifyLogin',
    productsList: '/api/productsList',
    searchProduct: '/api/searchProduct',
    getUser: '/api/getUserDetailByEmail',
    deleteUser: '/api/deleteAccount',
    updateUser: '/api/updateAccount',
};

const cardData = {
    nameOnCard: 'Test User',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2027'
};

const updatedUserData = {
    name: 'Updated User',
    address1: '456 New Street',
    city: 'London',
};

const categories = [
    { parent: '#Women', sub: 'Dress',       urlId: 1 },
    { parent: '#Women', sub: 'Tops',        urlId: 2 },
    { parent: '#Women', sub: 'Saree',       urlId: 7 },
    { parent: '#Men',   sub: 'Tshirts',     urlId: 3 },
    { parent: '#Men',   sub: 'Jeans',       urlId: 6 },
    { parent: '#Kids',  sub: 'Dress',       urlId: 4 },
    { parent: '#Kids',  sub: 'Tops & Shirts', urlId: 5 },
];

module.exports = { endpoints, cardData, updatedUserData,categories  };
