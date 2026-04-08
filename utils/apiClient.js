const axios = require('axios');

const api = axios.create({
    baseURL: 'https://demoqa.com',
    timeout: 60000 // 60 секунд — чтобы хватало на медленный сервер
});

module.exports = { api };