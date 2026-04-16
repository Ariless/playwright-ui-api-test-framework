const { test, expect } = require('../../fixtures/userFixture');
const { ProductsPage } = require('../../pages/ProductsPage');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { PaymentPage } = require('../../pages/PaymentPage');
const { cardData } = require('../../data/testData');

test('Mocked payment failure - error message is shown @e2e', async ({ loggedInPage }) => {
    const page = loggedInPage;

    await page.route('**/payment', async route => {
        if (route.request().method() === 'POST') {
            await route.fulfill({ status: 500, body: 'Payment failed' });
        } else {
            await route.continue();
        }
    });

    const productsPage = new ProductsPage(page);
    await productsPage.search('Blue Top');
    const productId = await productsPage.getFirstProductId();
    await productsPage.openProduct(productId);
    const productPage = new ProductPage(page, productId);
    await productPage.addToCart();
    const cartPage = new CartPage(page) ;
    await expect(cartPage.getProduct(productId)).toBeVisible();
    await cartPage.checkout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.placeOrder();
    const paymentPage = new PaymentPage(page);
    await paymentPage.fillPaymentForm(cardData);
    await paymentPage.confirmPayment();

    await expect(page).not.toHaveURL(/payment_done/);
});