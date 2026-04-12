const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.url = '/checkout';
        this.deliveryAddress = page.locator('#address_delivery')
        this.placeOrderButton = page.locator('a[href="/payment"]')
    }

    async getDeliveryAddressText() {
        return await this.deliveryAddress.innerText();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
        await this.page.waitForURL('**/payment');
    }
}

module.exports = { CheckoutPage };
