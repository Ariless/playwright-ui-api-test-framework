const { test, expect } = require('../../fixtures/userFixture');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { PaymentPage } = require('../../pages/PaymentPage');
const {ProductsPage} = require("../../pages/ProductsPage");


test('Cannot place order with empty payment form', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const productsPage = new ProductsPage(page);
    await productsPage.search('Blue Top');
    const productId = 1;
    await productsPage.openProduct(productId);
    const productPage = new ProductPage(page, productId);
    await productPage.addToCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.getProduct(productId)).toBeVisible();
    await cartPage.checkout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.placeOrder();

    const paymentPage = new PaymentPage(page);
    await paymentPage.confirmPayment()

    await expect(page).toHaveURL('/payment')

    await new CartPage(page).clearCart();

});