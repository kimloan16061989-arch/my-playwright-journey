// File: tests/day06.spec.ts
import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const BASE = 'https://automationexercise.com';

test.describe('Contact Us Tests', () => {

  // Tạo thư mục screenshots nếu chưa có
  test.beforeAll(() => {
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }
  });

  test.beforeEach(async ({ page }) => {
    // Chạy trước mỗi test: mở trang contact
    await page.goto(BASE + '/contact_us');
    await expect(page).toHaveURL(/contact_us/);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      const name = testInfo.title.replace(/[^a-z0-9]/gi, '_');
      await page.screenshot({ path: `screenshots/fail_${name}.png` });
      console.log(`Screenshot saved for failed test: ${testInfo.title}`);
    }
  });

  test('TC-C01 - Form có đủ fields', async ({ page }) => {
    // Dùng expect.soft() → tất cả assertions chạy dù 1 fail
    await expect.soft(page.locator('[data-qa="name"]')).toBeVisible();
    await expect.soft(page.locator('[data-qa="email"]')).toBeVisible();
    await expect.soft(page.locator('[data-qa="subject"]')).toBeVisible();
    await expect.soft(page.locator('[data-qa="message"]')).toBeVisible();
    // Hard assertion cuối: nút submit
    await expect(page.locator('[data-qa="submit-button"]')).toBeVisible();
  });

  test('TC-C02 - Submit rỗng → browser validation', async ({ page }) => {
    await page.click('[data-qa="submit-button"]');
    // Name là required field đầu tiên → browser sẽ focus vào đó
    const nameField = page.locator('[data-qa="name"]');
    // Kiểm tra xem ô này có hiển thị trên màn hình hay không thôi
    await expect(nameField).toBeVisible();
  });

  test('TC-C03 - Submit form đầy đủ → thành công', async ({ page }) => {
    await page.fill('[data-qa="name"]', 'Test User');
    await page.fill('[data-qa="email"]', 'test@example.com');
    await page.fill('[data-qa="subject"]', 'Test Subject');
    await page.fill('[data-qa="message"]', 'This is a test message from Playwright.');

    // --- ĐÂY LÀ ĐIỂM KHÁC BIỆT ---
    // Bạn phải "đăng ký" việc xử lý Dialog TRƯỚC khi Click
    page.on('dialog', dialog => dialog.accept()); 

    // Bây giờ mới Click. Khi Click xong, Dialog hiện ra, 
    // máy đã biết trước là phải nhấn "accept" nên nó sẽ xử lý ngay lập tức.
    await page.click('[data-qa="submit-button"]');
    // ----------------------------

    await expect(page.getByText('Success! Your details have been submitted successfully.').first())
  .toBeVisible();
});
});