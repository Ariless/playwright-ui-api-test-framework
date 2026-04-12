const { test, expect } = require('../../fixtures/userFixture');
const { PageFactory } = require('../../pages/PageFactory');
const { cardData } = require('../../data/testData');

test('Registered user completes full purchase @e2e', async ({ loggedInPage, user }) => {
    const page = loggedInPage;
    const productsPage = new PageFactory(page).productsPage();
    await productsPage.search('Blue Top');
    const productId = 1;
    await productsPage.openProduct(productId);
    const productPage = new PageFactory(page).productPage(productId);
    await productPage.addToCart();
    const cartPage = new PageFactory(page).cartPage() ;
    await expect(cartPage.getProduct(productId)).toBeVisible();

    await cartPage.checkout();
    const checkoutPage =new PageFactory(page).checkoutPage();

    const address = await checkoutPage.getDeliveryAddressText();
    expect(address).toContain(user.firstname);
    expect(address).toContain(user.address1);
    expect(address).toContain(user.city);

    await checkoutPage.placeOrder();

    const paymentPage = new PageFactory(page).paymentPage();
    await paymentPage.fillPaymentForm(cardData)
    await paymentPage.confirmPayment()

    const confirmationPage = new PageFactory(page).confirmationPage();
    await expect(page).toHaveURL(/payment_done/);
    await expect(confirmationPage.confirmationMessage).toBeVisible();
    await expect(confirmationPage.continueButton).toBeVisible();

    await confirmationPage.downloadInvoice();
 // дальше я хочу в загруженном файлике проверить текст

});