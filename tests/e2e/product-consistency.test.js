const { test, expect } = require('../../fixtures/userFixture');
const { PageFactory } = require('../../pages/PageFactory');

test('Product price matches cart price @e2e', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const productsPage = new PageFactory(page).productsPage();
    await productsPage.search('Blue Top');
    const productId = 1;
    await productsPage.openProduct(productId);
    const productPage = new PageFactory(page).productPage(productId);
    const productPagePrice = await productPage.getPrice();
    await productPage.addToCart();
    const cartPage = new PageFactory(page).cartPage();
    await expect(cartPage.getProduct(productId)).toBeVisible();
    const cartPrice = await cartPage.getOrderPrice(productId);
    expect(cartPrice).toBe(productPagePrice)

    await cartPage.clearCart();
});