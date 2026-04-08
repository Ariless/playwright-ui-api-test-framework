// fixtures/registeredUserFixture.js
const { test: base } = require('@playwright/test');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Берём данные пользователя из user.json
const userFile = path.join(__dirname, '../utils/user.json'); // путь к utils
const { username, password, userId } = JSON.parse(fs.readFileSync(userFile));

// Создаём axios клиент с большим таймаутом
const api = axios.create({
    baseURL: 'https://demoqa.com',
    timeout: 60000, // 60 секунд
    headers: { 'Content-Type': 'application/json' }
});

// Расширяем базовый тест
const test = base.extend({
    registeredUser: async ({}, use) => {
        let token = null;
        let attempts = 0;

        // Несколько попыток на случай медленного сервера
        while (!token && attempts < 3) {
            try {
                const res = await api.post('/Account/v1/GenerateToken', {
                    userName: username,
                    password
                });
                token = res.data.token;
            } catch (err) {
                attempts++;
                console.log(`Попытка ${attempts} не удалась. Ждём 10 секунд...`);
                await new Promise(r => setTimeout(r, 10000));
            }
        }

        if (!token) throw new Error('Не удалось получить токен для пользователя');

        // Передаём в тест
        await use({ userId, username, password, token });
    }
});

module.exports = { test, expect: base.expect };