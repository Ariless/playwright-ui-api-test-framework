const { LoginPage } = require('./LoginPage');
const { SignupPage } = require("./SignupPage");
const { CartPage } = require('./CartPage');
const { ProductsPage } = require('./ProductsPage');
const { ProductPage } = require('./ProductPage');
const { ConfirmationPage } = require('./ConfirmationPage');
const { PaymentPage } = require('./PaymentPage');
const { CheckoutPage } = require('./CheckoutPage');

class PageFactory {
    constructor(page) {
        this.page = page;
    }

    loginPage() {
        return new LoginPage(this.page);
    }

    signupPage() {
        return new SignupPage(this.page);
    }

    cartPage() {
        return new CartPage(this.page);
    }

    productsPage() {
        return new ProductsPage(this.page);
    }

    productPage(productId) {
        return new ProductPage(this.page, productId);
    }

    confirmationPage() {
        return new ConfirmationPage(this.page)
    }

    paymentPage() {
        return new PaymentPage(this.page)
    }

    checkoutPage() {
        return new CheckoutPage(this.page)
    }
}

module.exports = { PageFactory };