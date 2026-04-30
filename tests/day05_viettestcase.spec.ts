// Kịch bản: Test chức năng Login (quan trọng nhất trên mọi trang)

import { test, expect } from '@playwright/test';

const BASE = 'https://automationexercise.com';
// Tài khoản test thật - cần tạo trước trên trang này
const EMAIL = 'kimloan1606@gmail.com';
const PASSWORD = 'Loan@0802';

test('TC011 - Login thành công', async ({ page }) => {
  // ARRANGE
  await page.goto(BASE + '/login');
  await expect(page).toHaveTitle('Automation Exercise - Signup / Login');

  // ACT
  await page.fill('[data-qa="login-email"]', EMAIL);
  await page.fill('[data-qa="login-password"]', PASSWORD);
  await page.click('[data-qa="login-button"]');

  // ASSERT
  await expect(page).toHaveURL(BASE + '/');
  // Sau khi login, header sẽ hiển thị 'Logged in as <name>'
  await expect(page.getByText('Logged in as')).toBeVisible();
});

test('TC012 - Login sai password hiện lỗi', async ({ page }) => {
  // ARRANGE
  await page.goto(BASE + '/login');

  // ACT - điền sai password
  await page.fill('[data-qa="login-email"]', EMAIL);
  await page.fill('[data-qa="login-password"]', 'WRONG_PASS_123');
  await page.click('[data-qa="login-button"]');

  // ASSERT - kiểm tra thông báo lỗi
  await expect(page.getByText(
    'Your email or password is incorrect!')).toBeVisible();
  // Phải vẫn ở trang login
  await expect(page).toHaveURL(/login/);
});
