require('dotenv').config()
const { endpoints } = require('../data/testData');
const { test: base } = require('@playwright/test');
const { api } = require('../utils/apiClient');
const { LoginPage } = require('../pages/LoginPage');
const { generateUser } = require('../utils/userUtils');

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