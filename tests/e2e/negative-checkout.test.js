const { test, expect } = require('../../fixtures/userFixture');
const { PageFactory } = require('../../pages/PageFactory');

test('Cannot place order with empty payment form @e2e', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const productsPage =  new PageFactory(page).productsPage();
    await productsPage.search('Blue Top');
    const productId = 1;
    await productsPage.openProduct(productId);
    const productPage = new PageFactory(page).productPage(productId);
    await productPage.addToCart();
    const cartPage = new PageFactory(page).cartPage();
    await expect(cartPage.getProduct(productId)).toBeVisible();
    await cartPage.checkout();
    const checkoutPage = new PageFactory(page).checkoutPage();
    await checkoutPage.placeOrder();

    const paymentPage = new PageFactory(page).paymentPage();
    await paymentPage.confirmPayment()

    await expect(page).toHaveURL('/payment')

    await new PageFactory(page).cartPage().clearCart();

});