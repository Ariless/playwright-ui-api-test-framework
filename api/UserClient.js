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

    async getByEmail(email) {
        const response = await this.request.get(endpoints.getUser, { params: { email } });
        return this.parseResponse(response);
    }

    async update(user) {
        const response = await this.request.put(endpoints.updateUser, { form: user });
        return this.parseResponse(response);
    }
}

module.exports = { UserClient };
