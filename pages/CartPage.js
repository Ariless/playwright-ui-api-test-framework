const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.url =  '/view_cart';
        this.cartItems = page.locator('tr[id^="product-"]');
        this.deleteButton = page.locator('.cart_quantity_delete');

    }

    getProduct(productId) {
        return this.page.locator(`tr#product-${productId}`);
    }

    getProductQuantity(productId) {
        return this.page.locator(`tr#product-${productId} .cart_quantity button`);
    }


    async clearCart() {
        await this.open();
        while (await this.deleteButton.count() > 0) {
            const btn = this.deleteButton.first();
            await btn.click();
            await btn.waitFor({ state: 'detached' });
        }
    }
}

module.exports = { CartPage };