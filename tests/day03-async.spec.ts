import { test, expect } from '@playwright/test';

test('Login thành công (viết theo kiểu QC manual)', async ({ page }) => {
  // GIVEN (Điều kiện ban đầu):
  // User đang ở trang đăng nhập.
  await page.goto('https://www.saucedemo.com/');

  // WHEN (Hành động):
  // User nhập username + password rồi bấm Login.
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // THEN (Kết quả mong đợi):
  // User được chuyển sang trang danh sách sản phẩm.
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.title')).toHaveText('Products');
});
