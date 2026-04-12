const { endpoints } = require('../data/testData');

class ProductClient {
    constructor(request) {
        this.request = request;
    }

    async getAll() {
        return this.request.get(endpoints.productsList)
    }

    async search(term) {
        return this.request.post(endpoints.searchProduct, { form: { search_product: term } })
    }
}

module.exports = { ProductClient };
