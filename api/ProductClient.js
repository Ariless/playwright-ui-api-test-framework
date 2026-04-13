const { endpoints } = require('../data/testData');
const { BaseClient } = require('./BaseClient');

class ProductClient extends BaseClient {

    async getAll() {
        const response = await this.request.get(endpoints.productsList)
        return this.parseResponse(response);
    }

    async search(term) {
        const response = await this.request.post(endpoints.searchProduct, { form: { search_product: term } })
        return this.parseResponse(response);
    }
}

module.exports = { ProductClient };
