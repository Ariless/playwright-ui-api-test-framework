const BasePage = require('./BasePage');

class ConfirmationPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.url = '/payment_done/500';
        this.orderConfirmation = page.locator('[data-qa="order-placed"]');
        this.downloadInvoiceButton = page.locator('.btn.btn-default.check_out');
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }

    async downloadInvoice() {
        await this.downloadInvoiceButton.click();
    }

    get confirmationMessage() {
        return this.page.getByText('Congratulations! Your order has been confirmed!');
    }

}

module.exports = { ConfirmationPage };


