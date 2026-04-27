// Bài 1 - Đáp án selector trang /login:
// CSS: [data-qa='login-email'], [data-qa='login-password'], [data-qa='login-button']
// XPath: //input[@data-qa='login-email'], //input[@data-qa='login-password']
//        //button[@data-qa='login-button']

// File: tests/day04.spec.ts
import { test, expect } from '@playwright/test';

const BASE = 'https://automationexercise.com';

// Bài 2.1: Login sai → kiểm tra lỗi (CSS selector)
test('TC008 - Login email/password sai', async ({ page }) => {
  await page.goto(BASE + '/login');

  // Dùng CSS selector với data-qa attribute
  // LÝ DO dùng data-qa: ổn định hơn class/id thường đổi khi design
  await page.fill('[data-qa="login-email"]', 'wrong@email.com');
  await page.fill('[data-qa="login-password"]', 'wrongpass');
  await page.click('[data-qa="login-button"]');

  // Kiểm tra thông báo lỗi
  const errorMsg = page.locator('p:has-text("Your email or password is incorrect")');
  await expect(errorMsg).toBeVisible();
});

// Bài 2.2: Kiểm tra form đăng ký (XPath)
test('TC009 - Form signup hiển thị đủ fields', async ({ page }) => {
  await page.goto(BASE + '/login');

  // Dùng XPath tìm section đăng ký
  // LÝ DO dùng XPath: khi cần tìm theo text hiển thị
  const nameField = page.locator('//input[@data-qa="signup-name"]');
  const emailField = page.locator('//input[@data-qa="signup-email"]');
  const signupBtn = page.locator('//button[@data-qa="signup-button"]');

  await expect(nameField).toBeVisible();
  await expect(emailField).toBeVisible();
  await expect(signupBtn).toBeVisible();
});

// Bài 2.3: Tìm kiếm sản phẩm (kết hợp)
test('TC010 - Tìm kiếm shirt có kết quả', async ({ page }) => {
  await page.goto(BASE + '/products');

  // CSS selector cho input search
  await page.fill('#search_product', 'shirt');
  // XPath cho button search
  await page.click('//button[@id="submit_search"]');

  // Kiểm tra có kết quả
  const products = page.locator('.product-image-wrapper');
  const count = await products.count();
  expect(count).toBeGreaterThan(0);
  console.log(`Tìm thấy ${count} sản phẩm 'shirt'`);
});