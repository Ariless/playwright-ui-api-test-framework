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
    }

    async login(email, password) {
        await this.navigate(this.url);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('load');
    }

    async expectError(text) {
        await expect(this.errorMessage).toContainText(text);
    }
}

module.exports = { LoginPage };