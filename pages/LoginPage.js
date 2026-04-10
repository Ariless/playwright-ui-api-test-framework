const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
class LoginPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.emailInput = page.locator('input[data-qa="login-email"]');
        this.passwordInput = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');
        this.errorMessage = page.locator('p[style*="color: red"]');
    }

    async login(email, password) {
        await this.page.goto('/login');
        const cookieBtn = this.page.locator('button.fc-button.fc-cta-consent');
        if (await cookieBtn.isVisible()) {
            await cookieBtn.click();
        }
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectError(text) {
        await expect(this.errorMessage).toContainText(text);
    }
}

module.exports = { LoginPage };