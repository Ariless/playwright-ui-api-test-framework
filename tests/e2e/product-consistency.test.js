const { test, expect } = require('../../fixtures/userFixture');
const { ProductsPage } = require('../../pages/ProductsPage');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');

test('Product price matches cart price @e2e', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const productsPage = new ProductsPage(page);
    await productsPage.search('Blue Top');
    const productId = await productsPage.getFirstProductId();
    await productsPage.openProduct(productId);
    const productPage = new ProductPage(page, productId);
    const productPagePrice = await productPage.getPrice();
    await productPage.addToCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.getProduct(productId)).toBeVisible();
    const cartPrice = await cartPage.getOrderPrice(productId);
    expect(cartPrice).toBe(productPagePrice)

    await cartPage.clearCart();
});