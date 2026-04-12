class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(path) {
        await this.page.goto(path);
        await this.dismissCookies();

    }

    async getTitle() {
        return await this.page.title()
    }

    async open() {
        await this.navigate(this.url);
    }

    async dismissCookies() {
        const cookieBtn = this.page.locator('button.fc-button.fc-cta-consent');
        if (await cookieBtn.isVisible()) {
            await cookieBtn.click();
        }
        const popupClose = this.page.getByText('Close');
        if (await popupClose.isVisible()) {
            await popupClose.click();
        }
    }}

module.exports = BasePage;