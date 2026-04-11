import { test, expect } from '@playwright/test';

test('Bài tập Day 02 - Mở Google', async ({ page }) => {
  
  // Bước 1: Mở trang Google
  await page.goto('https://www.google.com');

  // Bước 2: Kiểm tra title có chữ Google không
  await expect(page).toHaveTitle(/Google/);

  // Bước 3: In ra thông báo thành công
  console.log('✅ Mở Google thành công!');

});