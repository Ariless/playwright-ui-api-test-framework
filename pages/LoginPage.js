const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
class LoginPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.url = '/login';
        this.emailInput = page.locator('input[data-qa="login-email"]');
        this.passwordInput = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');
        this.errorMessage = page.locator('p[style*="color: red"]');

        this.signUpNameInput = page.locator('input[data-qa="signup-name"]');
        this.signUpEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signUpButton = page.locator('button[data-qa="signup-button"]');
    }

    async login(email, password) {
        await this.navigate(this.url);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.locator('a[href="/logout"]').waitFor({ timeout: 15000 });
    }

    async expectError(text) {
        await expect(this.errorMessage).toContainText(text);
    }

    async signUp(name, email) {
        await this.navigate(this.url);
        await this.signUpNameInput.fill(name);
        await this.signUpEmailInput.fill(email);
        await this.signUpButton.click();
    }
}

module.exports = { LoginPage };