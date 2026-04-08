# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/ui/books.test.js >> API + UI with registered user
- Location: tests/ui/books.test.js:10:1

# Error details

```
AxiosError: Request failed with status code 400
```

# Test source

```ts
  1  | // tests/ui/books.test.js
  2  | const { test, expect } = require('../../fixtures/registeredUserFixture');
  3  | const { BooksPage } = require('../../pages/booksPage');
  4  | const axios = require('axios');
  5  | 
  6  | const isbn = '9781449331818'; // Git Pocket Guide
  7  | 
  8  | test.setTimeout(90000); // 90 секунд на тест, учитывая долгий отклик DemoQA
  9  | 
  10 | test('API + UI with registered user', async ({ page, registeredUser }) => {
  11 |     const { userId, token, username } = registeredUser;
  12 | 
  13 |     // Создаём книгу через API
  14 |     const apiClient = axios.create({
  15 |         baseURL: 'https://demoqa.com',
  16 |         headers: {
  17 |             'Authorization': `Bearer ${token}`,
  18 |             'Content-Type': 'application/json'
  19 |         },
  20 |         timeout: 60000
  21 |     });
  22 | 
> 23 |     await apiClient.post('/BookStore/v1/Books', {
     |     ^ AxiosError: Request failed with status code 400
  24 |         userId,
  25 |         collectionOfIsbns: [{ isbn }]
  26 |     });
  27 | 
  28 |     // Переходим на страницу Books
  29 |     const booksPage = new BooksPage(page);
  30 |     await booksPage.goto();
  31 | 
  32 |     // Проверяем, что книга отображается на UI
  33 |     await booksPage.expectBookExists('Git Pocket Guide');
  34 | 
  35 |     // Удаляем книгу через API
  36 |     await apiClient.delete('/BookStore/v1/Books', {
  37 |         data: { userId, isbn }
  38 |     });
  39 | });
```