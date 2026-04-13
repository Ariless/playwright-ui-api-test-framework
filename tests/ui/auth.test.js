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

});