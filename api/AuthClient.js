const { endpoints } = require('../data/testData');
const { BaseClient } = require('./BaseClient');

class AuthClient extends BaseClient {

    async verifyLogin(email, password) {
        const response = await this.request.post(endpoints.verifyLogin, { form: { email, password } });
        return this.parseResponse(response);
    }
}

module.exports = { AuthClient };
