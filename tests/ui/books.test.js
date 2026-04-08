// tests/ui/books.test.js
const { test, expect } = require('../../fixtures/registeredUserFixture');
const { BooksPage } = require('../../pages/booksPage');
const axios = require('axios');

const isbn = '9781449331818'; // Git Pocket Guide

test.setTimeout(90000); // 90 секунд на тест, учитывая долгий отклик DemoQA

test('API + UI with registered user', async ({ page, registeredUser }) => {
    const { userId, token, username } = registeredUser;

    // Создаём книгу через API
    const apiClient = axios.create({
        baseURL: 'https://demoqa.com',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        timeout: 60000
    });

    await apiClient.post('/BookStore/v1/Books', {
        userId,
        collectionOfIsbns: [{ isbn }]
    });

    // Переходим на страницу Books
    const booksPage = new BooksPage(page);
    await booksPage.goto();

    // Проверяем, что книга отображается на UI
    await booksPage.expectBookExists('Git Pocket Guide');

    // Удаляем книгу через API
    await apiClient.delete('/BookStore/v1/Books', {
        data: { userId, isbn }
    });
});