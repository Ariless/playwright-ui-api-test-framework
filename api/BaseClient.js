class BaseClient {
    constructor(request) {
        this.request = request;
    }

    async parseResponse(response) {
        const body = await response.json();
        return { status: response.status(), body };
    }
}

module.exports = { BaseClient };