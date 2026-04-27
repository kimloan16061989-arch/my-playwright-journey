import { test, expect } from '@playwright/test';

const baseUrl = 'https://automationexercise.com';
const validEmail = 'testuser@test.com';
const validPassword = 'Test@1234';

test('TC003 - Menu items hiển thị đủ', async ({ page }) => {
  await page.goto(baseUrl);

  const menuItems = ['Home', 'Products', 'Cart'];

  for (const item of menuItems) {
    const menuEl = page.getByRole('link', { name: item });
    await expect(menuEl).toBeVisible();
    console.log(`✓ Menu '${item}' hiển thị OK`);
  }
});

// Test dùng if/else (Bài 2.3)
test('TC004 - Chuyển đến trang Login', async ({ page }) => {
    await page.goto(baseUrl);
  
    const loginLink = page.getByRole('link', { name: 'Signup / Login' });
    const isVisible = await loginLink.isVisible();
  
    if (isVisible) {
      await loginLink.click();
      // Kiểm tra đã vào trang login
      await expect(page).toHaveURL(/login/);
      await expect(page).toHaveTitle(/Automation Exercise/);
    } else {
      throw new Error('Không tìm thấy nút Signup/Login!');
    }
  });
  