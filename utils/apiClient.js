require('dotenv').config()
const axios = require('axios');

const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 60000 // 60 секунд — чтобы хватало на медленный сервер
});

module.exports = { api };