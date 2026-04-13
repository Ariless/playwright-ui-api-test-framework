const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { generateUser } = require('../utils/userUtils');
const { UserClient } = require('../api/UserClient');

const test = base.extend({
    // Setup: creates a unique user via API before the test.
    // Teardown: deletes the user via API after the test, even if the test fails.
    // This keeps each test fully isolated — no shared state between tests.
    user: async ({ request }, use) => {
        const userClient = new UserClient(request);
        const userData = generateUser();
        await userClient.create(userData)
        await use(userData);
        await userClient.delete(userData.email, userData.password);
    },
    // Depends on `user` fixture — reuses the created user to log in via UI.
    // Provides a ready-to-use authenticated page object to the test.
    loggedInPage: async ({ page, user }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(user.email, user.password);
        await use(page);
    },
});

module.exports = { test, expect: base.expect }