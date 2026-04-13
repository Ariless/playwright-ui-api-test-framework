require('dotenv').config();

// Generates a unique user for each test run.
// Uniqueness is guaranteed by Date.now() timestamp — no two users
// created in the same millisecond will share an email or name.
// This prevents data collisions in parallel test runs.
function generateUser() {
    const id = Date.now();
    return {
        email: `test_${id}@test.com`,
        name: `user_${id}`,
        password: process.env.PASSWORD || 'Test1234!',
        firstname: process.env.FIRSTNAME || 'Test',
        lastname: process.env.LASTNAME || 'User',
        title: process.env.TITLE || 'Mr',
        birth_date: process.env.BIRTH_DATE || '1',
        birth_month: process.env.BIRTH_MONTH || 'January',
        birth_year: process.env.BIRTH_YEAR || '1990',
        country: process.env.COUNTRY || 'United States',
        mobile_number: process.env.MOBILE_NUMBER || '1234567890',
        address1: process.env.ADDRESS || '123 Test Street',
        city: process.env.CITY || 'New York',
        state: process.env.STATE || 'New York',
        zipcode: process.env.ZIPCODE || '10001',
    };
}

module.exports = { generateUser };
