require('dotenv').config();
const { api } = require('./apiClient');
const endpoints = require('../data/testData').endpoints;

(async () => {
    const email = process.env.EMAIL;

    try {
        // Создаём пользователя через API
        const userRes = await api.post(endpoints.account, {
            name: process.env.NAME,
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
            firstname: process.env.FIRSTNAME,
            lastname: process.env.LASTNAME,
            title: process.env.TITLE,
            birth_date: process.env.BIRTH_DATE,
            birth_month: process.env.BIRTH_MONTH,
            birth_year: process.env.BIRTH_YEAR,
            country: process.env.COUNTRY,
            mobile_number: process.env.MOBILE_NUMBER,
        })
        console.log('Пользователь создан:', email);
    } catch (err) {
        console.log('Ошибка:', err.response?.data || err.message);
    }
})();