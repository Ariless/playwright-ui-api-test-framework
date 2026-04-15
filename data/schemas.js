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

const userSchema = {
    type: 'object',
    required: ['email', 'name', 'address1', 'city'],
    properties: {
        email:    { type: 'string' },
        name:     { type: 'string' },
        address1: { type: 'string' },
        city:     { type: 'string' },
    }
};


const validateProduct = ajv.compile(productSchema);
const validateUser = ajv.compile(userSchema);

module.exports = { validateProduct, validateUser };
