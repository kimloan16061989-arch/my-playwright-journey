import { test, expect } from '@playwright/test';

/**
 * FILE NAY LA TEMPLATE HOC BO CUC TESTCASE AUTOMATION
 *
 * Cach dung:
 * 1) Copy test block ben duoi thanh test moi.
 * 2) Sua TC_ID, ten test, test data, selector.
 * 3) Giữ cấu trúc Arrange -> Act -> Assert để code dễ đọc.
 */

test.describe('Template Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Setup chung cho moi test (neu can):
    // - Mo trang
    // - Login mac dinh
    // - Tao du lieu test
    await page.goto('https://example.com/login');
  });

  /**
   * TC_ID: <VD: LOGIN_001>
   * Ten test: <Mo ta ngan gon testcase>
   *
   * Pre-condition:
   * - <Dieu kien 1>
   * - <Dieu kien 2>
   *
   * Test data:
   * - username: <gia tri>
   * - password: <gia tri>
   *
   * Test steps (manual):
   * 1) <Buoc 1>
   * 2) <Buoc 2>
   * 3) <Buoc 3>
   *
   * Expected result:
   * - <Ket qua mong doi 1>
   * - <Ket qua mong doi 2>
   */
  test('TC_ID - Ten testcase', async ({ page }) => {
    // ARRANGE: Chuan bi du lieu/input
    const username = 'your_username';
    const password = 'your_password';

    // ACT: Thuc hien hanh dong user
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('#login-button');

    // ASSERT: Verify ket qua
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('[data-test="welcome"]')).toHaveText('Welcome');
  });

  /**
   * TEMPLATE CHO NEGATIVE CASE
   * TC_ID: <VD: LOGIN_002>
   * Ten test: <Mo ta case that bai>
   */
  test('TC_ID - Ten testcase negative', async ({ page }) => {
    // ARRANGE
    const username = 'valid_user';
    const password = 'wrong_password';

    // ACT
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('#login-button');

    // ASSERT
    await expect(page).not.toHaveURL(/dashboard/);
    await expect(page.locator('[data-test="error"]')).toContainText('Invalid credentials');
  });
});
