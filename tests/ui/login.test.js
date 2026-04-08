// tests/ui/login.test.js
const { test, expect } = require('../../fixtures/registeredUserFixture');
const { LoginPage } = require('../../pages/loginPage');

test('Login success', async ({ page, registeredUser }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(registeredUser.username, registeredUser.password);

    // Проверяем, что token появился в localStorage
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).not.toBeNull();
});

test('Wrong password', async ({ page, registeredUser }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(registeredUser.username, 'WrongPass123!');

    await loginPage.expectError('Invalid username or password!');
});