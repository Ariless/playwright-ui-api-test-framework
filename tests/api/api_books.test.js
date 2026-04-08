const { test, expect } = require('@playwright/test');
const { createBook, deleteBook } = require('../../fixtures/apiBookFixture');

const userId = 'ваш-user-id';
const isbn = '9781449325862';

test.describe('DemoQA Books API', () => {

    test('Создание книги через API', async () => {
        const data = await createBook(userId, isbn);
        expect(data.books[0].isbn).toBe(isbn);
    });

    test('Удаление книги через API', async () => {
        await createBook(userId, isbn);
        await deleteBook(userId, isbn);
    });

    test('Получение списка книг пользователя', async () => {
        const response = await require('../../utils/apiClient').api.get(`/Books?UserId=${userId}`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('books');
    });

});