// utils/createUser.js
const { api } = require('./apiClient');
const fs = require('fs');

(async () => {
    const username = 'demo_user_fixed';
    const password = 'Test@123';
    const firstName = 'Test';
    const lastName = 'User';

    try {
        // Создаём пользователя через API
        const userRes = await api.post('/Account/v1/User', { userName: username, password });
        const userId = userRes.data.userID;

        // Получаем токен
        const tokenRes = await api.post('/Account/v1/GenerateToken', { userName: username, password });
        const token = tokenRes.data.token;

        // Сохраняем данные в JSON
        fs.writeFileSync('utils/user.json', JSON.stringify({ username, password, userId, token }, null, 2));
        console.log('Пользователь создан и сохранён:', username);
    } catch (err) {
        console.log('Пользователь уже существует или ошибка:', err.response?.data || err.message);
    }
})();