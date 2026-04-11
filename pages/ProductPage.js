const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class ProductPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, productId = 1) {
        super(page);
        this.url = `/product_details/${productId}`;
        this.addToCartButton = page.locator('.btn.btn-default.cart');
        this.quantityInput = page.locator('input#quantity');
    }

    async addToCart() {
        await this.addToCartButton.click();
        await this.page.locator('.modal-content').waitFor();
    }

    async setQuantity(qty) {
        await this.quantityInput.fill(String(qty));
    }
}

module.exports = { ProductPage };