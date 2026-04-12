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

    async assertDeliveryAddress(user) {
        await expect(this.deliveryAddress).toContainText(user.firstname);
        await expect(this.deliveryAddress).toContainText(user.address1);
        await expect(this.deliveryAddress).toContainText(user.city);
    }


    async placeOrder() {
        await this.placeOrderButton.click();
        await this.page.waitForLoadState('load');

    }
}

module.exports = { CheckoutPage };
