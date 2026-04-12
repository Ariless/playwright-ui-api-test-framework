const { endpoints } = require('../data/testData');

class UserClient {
    constructor(request) {
        this.request = request;
    }

    async create(user) {
        return this.request.post(endpoints.account, { form: user })
    }

    async delete(email, password) {
        return this.request.delete(endpoints.deleteUser, {form: { email, password } })
    }
}

module.exports = { UserClient };
