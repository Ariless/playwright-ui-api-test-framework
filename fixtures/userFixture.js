require('dotenv').config()
const { endpoints } = require('../data/testData');
const { test: base } = require('@playwright/test');

// Берём данные пользователя из переменных окружения
const password = process.env.PASSWORD;
const email = process.env.EMAIL;

const { api } = require('../utils/apiClient');

// Расширяем базовый тест
const test = base.extend({
    user: async ({}, use) => {
        await api.post(endpoints.verifyLogin, { email, password });
        await use({ email, password });
    },
});

module.exports = { test, expect: base.expect }