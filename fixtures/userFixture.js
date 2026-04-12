const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { generateUser } = require('../utils/userUtils');
const { UserClient } = require('../api/UserClient');

const test = base.extend({
    user: async ({ request }, use) => {
        const userClient = new UserClient(request);
        const userData = generateUser();
        await userClient.create(userData)
        await use(userData);
        await userClient.delete(userData.email, userData.password);
    },
    loggedInPage: async ({ page, user }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(user.email, user.password);
        await use(page);
    },
});

module.exports = { test, expect: base.expect }