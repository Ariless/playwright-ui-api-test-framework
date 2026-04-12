const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class ProductPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, productId) {
        super(page);
        this.url = `/product_details/${productId}`;
        this.addToCartButton = page.locator('.btn.btn-default.cart');
        this.quantityInput = page.locator('input#quantity');
        this.price = page.locator('.product-information span span');
    }

    async addToCart() {
        await this.addToCartButton.click();
        await this.page.locator('.modal-content').waitFor();
        await this.page.locator('.modal-content a[href="/view_cart"]').click();
    }

    async setQuantity(qty) {
        await this.quantityInput.fill(String(qty));
    }

    async getPrice() {
        return await this.price.innerText();
    }
}

module.exports = { ProductPage };