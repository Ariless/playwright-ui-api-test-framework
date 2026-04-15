const { test, expect } = require('../../fixtures/userFixture');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Auth UI @ui', () => {

    test('Login with valid credentials @smoke', async ({ page, user }) => {
        const { email, password, name } = user;
        const loginPage = new LoginPage(page);
        await loginPage.login(email, password);

        await expect(page.locator('a[href="/logout"]')).toBeVisible({ timeout: 15000 });
        const loggedInAs = page.locator('li:has-text("Logged in as")');
        await expect(loggedInAs).toContainText(`Logged in as ${name}`);
    });

    test('Login with invalid credentials', async ({ page, user }) => {
        const loginPage = new LoginPage(page);
        const { email } = user;
        await loginPage.submitLoginForm(email, 'WrongPass123!');

        await loginPage.expectError('Your email or password is incorrect!');
    });

    test('Logout user is logged out', async ({ page, user }) => {
        const { email, password } = user;
        const loginPage = new LoginPage(page);
        await loginPage.login(email, password);

        await page.locator('a[href="/logout"]').click();
        await expect(page.locator('a[href="/login"]')).toBeVisible();
        await expect(page).toHaveURL('/login');
    });

    test('Login with empty email', async ({ page, user }) => {
        const loginPage = new LoginPage(page);
        await loginPage.submitLoginForm('', user.password);
        await expect(page.locator('input[data-qa="login-email"]:invalid')).toHaveCount(1);
    });

    test('Login with empty password', async ({ page, user }) => {
        const loginPage = new LoginPage(page);
        await loginPage.submitLoginForm(user.email, '');
        await expect(page.locator('input[data-qa="login-password"]:invalid')).toHaveCount(1);
    });

    test('Login page elements are visible', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate(loginPage.url);
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

});