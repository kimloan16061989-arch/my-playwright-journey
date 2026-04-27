import { test, expect } from '@playwright/test';

test.describe('Login test suite (manual style cho QC)', () => {
  /**
   * TC_ID: LOGIN_001
   * Tên test: Đăng nhập thành công với tài khoản hợp lệ
   *
   * Pre-condition:
   * - Website đang hoạt động bình thường
   * - Có tài khoản hợp lệ:
   *   + username: standard_user
   *   + password: secret_sauce
   *
   * Test steps (manual):
   * 1) Mở trang login
   * 2) Nhập username
   * 3) Nhập password
   * 4) Click nút Login
   *
   * Expected result:
   * - User được chuyển sang trang inventory
   * - Tiêu đề trang hiển thị "Products"
   */
  test('TC LOGIN_001 - Đăng nhập thành công', async ({ page }) => {
    // Step 1: Mở trang login
    await page.goto('https://www.saucedemo.com/');

    // Step 2 + 3: Nhập thông tin đăng nhập
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    // Step 4: Bấm nút Login
    await page.click('#login-button');

    // Verify expected result
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  /**
   * TC_ID: LOGIN_002
   * Tên test: Đăng nhập thất bại với password sai
   *
   * Pre-condition:
   * - Website đang hoạt động bình thường
   * - Có username hợp lệ: standard_user
   * - Password nhập sai: wrong_password
   *
   * Test steps (manual):
   * 1) Mở trang login
   * 2) Nhập username hợp lệ
   * 3) Nhập password sai
   * 4) Click nút Login
   *
   * Expected result:
   * - User KHÔNG được chuyển sang trang inventory
   * - Hiển thị thông báo lỗi đăng nhập
   */
  test('TC LOGIN_002 - Đăng nhập thất bại khi sai password', async ({ page }) => {
    // Step 1: Mở trang login
    await page.goto('https://www.saucedemo.com/');

    // Step 2 + 3: Nhập thông tin đăng nhập (password sai)
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');

    // Step 4: Bấm nút Login
    await page.click('#login-button');

    // Verify expected result
    await expect(page).not.toHaveURL(/inventory/);
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match',
    );
  });
});
