const { endpoints } = require('../data/testData');
const { BaseClient } = require('./BaseClient');

class UserClient extends BaseClient{

    async create(user) {
        const response = await this.request.post(endpoints.account, { form: user })
        return this.parseResponse(response);
    }

    async delete(email, password) {
        const response = await this.request.delete(endpoints.deleteUser, {form: { email, password } })
        return this.parseResponse(response);
    }
}

module.exports = { UserClient };
