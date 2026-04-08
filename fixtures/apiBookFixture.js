// fixtures/apiBookFixture.js
const axios = require('axios');

async function createBook(userId, isbn, token) {
    try {
        const response = await axios.post(
            'https://demoqa.com/BookStore/v1/Books',
            {
                userId,
                collectionOfIsbns: [{ isbn }] // ❗ обязательно массив объектов
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
    } catch (err) {
        console.error('Ошибка при создании книги:', err.response?.data || err.message);
        throw err;
    }
}