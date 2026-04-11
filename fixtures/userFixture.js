require('dotenv').config()
const { endpoints } = require('../data/testData');
const { test: base } = require('@playwright/test');
const { api } = require('../utils/apiClient');
const { LoginPage } = require('../pages/LoginPage');

const password = process.env.PASSWORD;

function generateUser() {
    const id = Date.now();
    return {
        email: `test_${id}@test.com`,
        name: `user_${id}`,
        password,
        firstname: process.env.FIRSTNAME,
        lastname: process.env.LASTNAME,
        title: process.env.TITLE,
        birth_date: process.env.BIRTH_DATE,
        birth_month: process.env.BIRTH_MONTH,
        birth_year: process.env.BIRTH_YEAR,
        country: process.env.COUNTRY,
        mobile_number: process.env.MOBILE_NUMBER,
        address1: process.env.ADDRESS,
        city: process.env.CITY,
        state: process.env.STATE,
        zipcode: process.env.ZIPCODE,
    };
}

const test = base.extend({
    user: async ({ request }, use) => {
        const userData = generateUser();
        await api.post(endpoints.account, userData);
        await use(userData);
        await request.delete(process.env.BASE_URL + endpoints.deleteUser, {
            form: { email: userData.email, password: userData.password }
        });
    },
    loggedInPage: async ({ page, user }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(user.email, user.password);
        await use(page);
    },
});

module.exports = { test, expect: base.expect }