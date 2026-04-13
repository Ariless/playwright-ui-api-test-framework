const { test, expect } = require('../../fixtures/userFixture');
const { cardData } = require('../../data/testData');
const fs = require('fs');
const { ProductsPage } = require('../../pages/ProductsPage');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { PaymentPage } = require('../../pages/PaymentPage');
const { ConfirmationPage } = require('../../pages/ConfirmationPage');

test('Registered user completes full purchase @e2e', async ({ loggedInPage, user }) => {
    const page = loggedInPage;
    const productsPage = new ProductsPage(page);
    await productsPage.search('Blue Top');
    const productId = await productsPage.getFirstProductId();
    await productsPage.openProduct(productId);
    const productPage = new ProductPage(page, productId);
    await productPage.addToCart();
    const cartPage = new CartPage(page) ;
    await expect(cartPage.getProduct(productId)).toBeVisible();
    const cartPrice = await cartPage.getOrderPrice(productId);

    await cartPage.checkout();
    const checkoutPage = new CheckoutPage(page);

    const address = await checkoutPage.getDeliveryAddressText();
    expect(address).toContain(user.firstname);
    expect(address).toContain(user.address1);
    expect(address).toContain(user.city);

    await checkoutPage.placeOrder();

    const paymentPage = new PaymentPage(page);
    await paymentPage.fillPaymentForm(cardData)
    await paymentPage.confirmPayment()

    const confirmationPage = new ConfirmationPage(page);
    await expect(page).toHaveURL(/payment_done/);
    await expect(confirmationPage.confirmationMessage).toBeVisible();
    await expect(confirmationPage.continueButton).toBeVisible();

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        confirmationPage.downloadInvoice()
    ]);
    await download.saveAs('test-results/invoice.txt');
    const content = fs.readFileSync('test-results/invoice.txt', 'utf-8');
    const priceNumber = cartPrice.replace(/[^0-9]/g, '');
    expect(content).toContain(priceNumber);
    expect(content).toContain(user.lastname);
    expect(content).toContain('Thank you');
});