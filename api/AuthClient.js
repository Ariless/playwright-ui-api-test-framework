const { endpoints } = require('../data/testData');

class AuthClient {
    constructor(request) {
        this.request = request;
    }

    async verifyLogin(email, password) {
        return this.request.post(endpoints.verifyLogin, { form: { email, password } })
    }
}

module.exports = { AuthClient };
