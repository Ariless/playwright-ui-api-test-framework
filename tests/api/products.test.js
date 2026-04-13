const { test, expect } = require('@playwright/test');
const { ProductClient } = require('../../api/ProductClient');
const Ajv = require('ajv');
const ajv = new Ajv();
const productSchema = {
    type: 'object',
    required: ['id', 'name', 'price'],
    properties: {
        id:    { type: 'number' },
        name:  { type: 'string' },
        price: { type: 'string' }
    }
};
const validate = ajv.compile(productSchema);

test('Get products list @api @smoke', async ({request}) => {
    const productClient = new ProductClient(request);
    const { body } = await productClient.getAll()
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
    body.products.forEach(product => {
        const valid = validate(product);
        expect(valid).toBe(true);
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
    });
});

test('Search product @api', async ({request}) => {
    const productClient = new ProductClient(request);
    const searchTerm = 'Blue Top';
    const { body } = await productClient.search(searchTerm)
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    const matchingProduct = body.products.find(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    expect(matchingProduct).toBeTruthy();

    body.products.forEach(product => {
        const valid = validate(product);
        expect(valid).toBe(true);
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
    });
});

test('Search product - no results @api', async ({request}) => {
    const productClient = new ProductClient(request);
    const { body } = await productClient.search( 'NonexistentProduct' );

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBe(0);
});