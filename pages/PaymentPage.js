const BasePage = require('./BasePage');

class PaymentPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.url = '/payment';
        this.nameOnCard = page.locator('[data-qa="name-on-card"]')
        this.cardNumber = page.locator('[data-qa="card-number"]')
        this.cvc = page.locator('[data-qa="cvc"]')
        this.expiryMonth = page.locator('[data-qa="expiry-month"]')
        this.expiryYear = page.locator('[data-qa="expiry-year"]')
        this.confirmButton = page.locator('[data-qa="pay-button"]')
    }

    async fillPaymentForm(cardData) {
        await this.nameOnCard.fill(cardData.nameOnCard);
        await this.cardNumber.fill(cardData.cardNumber);
        await this.cvc.fill(cardData.cvc);
        await this.expiryMonth.fill(cardData.expiryMonth);
        await this.expiryYear.fill(cardData.expiryYear);
    }

    async confirmPayment() {
        await this.confirmButton.click();
    }
}

module.exports = { PaymentPage };
