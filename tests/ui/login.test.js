const { test, expect } = require('../../fixtures/userFixture');
const { LoginPage } = require('../../pages/LoginPage');

test('Login with valid credentials', async ({ page, user }) => {
    const {email, password} = user
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);

    // Проверяем, что юзер успешно залогинился
    await expect(page.locator('a[href="/logout"]')).toBeVisible();
})

test('Login with invalid credentials', async ({ page, user }) => {
    const loginPage = new LoginPage(page);
    const { email } = user;
    await loginPage.login(email, 'WrongPass123!');

    await loginPage.expectError('Your email or password is incorrect!');
})