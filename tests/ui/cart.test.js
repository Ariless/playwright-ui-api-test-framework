const { test, expect } = require('../../fixtures/userFixture');
const { ProductsPage } = require('../../pages/ProductsPage');
const { ProductPage } = require("../../pages/ProductPage");
const { CartPage } = require('../../pages/CartPage');

test.describe('Cart UI', () => {

    test('Add product to cart', async ({ loggedInPage }) => {
        const page = loggedInPage;
        const productsPage = new ProductsPage(page);
        const productId = 5;
        await productsPage.openProduct(productId);
        const productPage = new ProductPage(page, productId);
        await productPage.addToCart();
        const cartPage = new CartPage(page);
        await cartPage.open();

        await expect(cartPage.getProduct(productId)).toBeVisible();
        await cartPage.clearCart();
    });

    test('Cart persistence', async ({ loggedInPage }) => {
        const page = loggedInPage;
        const productsPage = new ProductsPage(page);
        const productId = 2;
        await productsPage.openProduct(productId);
        const productPage = new ProductPage(page, productId);
        await productPage.addToCart();
        const cartPage = new CartPage(page);
        await cartPage.open();
        await page.reload();

        await expect(cartPage.getProduct(productId)).toBeVisible();
        await cartPage.clearCart();
    });

    test('Add product with quantity', async ({ loggedInPage }) => {
        const page = loggedInPage;
        const productsPage = new ProductsPage(page);
        const productId = 6;
        await productsPage.openProduct(productId);
        const productPage = new ProductPage(page, productId);
        const quantity = 2;
        await productPage.setQuantity(quantity);
        await productPage.addToCart();
        const cartPage = new CartPage(page);
        await cartPage.open();

        await expect(cartPage.getProduct(productId)).toBeVisible();
        await expect(cartPage.getProductQuantity(productId)).toHaveText(String(quantity));
        await cartPage.clearCart();
    });

});