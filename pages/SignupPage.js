const BasePage = require('./BasePage');

class SignupPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.url = '/signup';
        this.titleMr = page.locator('#id_gender1');
        this.titleMrs = page.locator('#id_gender2');
        this.passwordInput = page.locator('[data-qa="password"]');
        this.daysSelect = page.locator('[data-qa="days"]');
        this.monthsSelect = page.locator('[data-qa="months"]');
        this.yearsSelect = page.locator('[data-qa="years"]');
        this.newsletterCheckbox = page.locator('#newsletter');
        this.offersCheckbox = page.locator('#optin');
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.address1Input = page.locator('[data-qa="address"]');
        this.address2Input = page.locator('[data-qa="address2"]');
        this.countrySelector = page.locator('[data-qa="country"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipCodeInput = page.locator('[data-qa="zipcode"]');
        this.phoneInput = page.locator('[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }

    async createAccount(user) {
        if (user.title === 'Mr') {
            await this.titleMr.check();
        } else {
            await this.titleMrs.check();
        }
        await this.passwordInput.fill(user.password);
        await this.daysSelect.selectOption(user.birth_date);
        await this.monthsSelect.selectOption(user.birth_month);
        await this.yearsSelect.selectOption(user.birth_year);
        await this.newsletterCheckbox.check();
        await this.offersCheckbox.check();
        await this.firstNameInput.fill(user.firstname);
        await this.lastNameInput.fill(user.lastname);
        await this.address1Input.fill(user.address1);
        await this.countrySelector.selectOption(user.country);
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipCodeInput.fill(user.zipcode);
        await this.phoneInput.fill(user.mobile_number);
        await this.createAccountButton.click();
    }

    get accountCreatedMessage() {
        return this.page.getByText('Account Created!');
    }

    async continueAfterCreation() {
        await this.continueButton.click();
        }
}

module.exports = { SignupPage };
