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
        this.checkoutButton = page.locator('.check_out');
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

    async checkout() {
        await this.checkoutButton.click();
    }

    async getOrderPrice(productId) {
        return await this.page.locator(`tr#product-${productId} .cart_price p`).innerText();
    }

    async proceedToLogin() {
        await this.page.locator('.modal-body a[href="/login"]').click();
    }

}

module.exports = { CartPage };