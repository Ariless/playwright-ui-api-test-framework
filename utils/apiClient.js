require('dotenv').config()
const axios = require('axios');

const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

module.exports = { api };