// File: tests/day05.spec.ts
import { test, expect } from '@playwright/test';

const BASE = 'https://automationexercise.com';

// ===== BÀI 1: TEST TRANG CHỦ =====

test('TC-HP-01 - Title trang chủ đúng', async ({ page }) => {
  await page.goto(BASE);
  await expect(page).toHaveTitle('Automation Exercise');
});

test('TC-HP-02 - Navigation đủ 5 link', async ({ page }) => {
    await page.goto(BASE);
  
    // Dùng getByRole - cách Playwright khuyến nghị
    // "Test Cases" có 2 link (nav icon + text, footer); name mặc định là substring → strict mode
    const navLinks: { name: string; exact?: boolean }[] = [
      { name: 'Home' },
      { name: 'Products' },
      { name: 'Cart' },
      { name: 'Signup / Login' },
      { name: 'Test Cases', exact: true },
    ];
    for (const link of navLinks) {
      await expect(
        page.getByRole('link', { name: link.name, ...(link.exact ? { exact: true } : {}) }),
      ).toBeVisible();
    }
  });

test('TC-HP-03 - Banner/slider hiển thị', async ({ page }) => {
  await page.goto(BASE);
  // Banner carousel có class 'carousel'
  await expect(page.locator('#slider')).toBeVisible();
});

// ===== BÀI 2: TEST TRANG PRODUCTS =====

test.describe('🔐 Products Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE + '/products');
  });

test('TC-PROD-01 - Trang products load đúng', async ({ page }) => {
  await expect(page).toHaveURL(/products/);
  // Có ít nhất 1 sản phẩm
  const products = page.locator('.product-image-wrapper');
  await expect(products.first()).toBeVisible();
});

test('TC-PROD-02 - Tìm kiếm top có kết quả', async ({ page }) => {
  await page.fill('#search_product', 'top');
  await page.click('#submit_search');
  const results = page.locator('.product-image-wrapper');
  const count = await results.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

test('TC-PROD-03 - Click sản phẩm → xem chi tiết', async ({ page }) => {
  // Click 'View Product' của sản phẩm đầu tiên
  await page.locator('.choose a').first().click();
  // Kiểm tra có giá hiển thị
  await expect(page.locator('.product-information span span')).toBeVisible();
  // Kiểm tra có nút Add to Cart
  await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
});

});
// Chạy: npx playwright test tests/day05.spec.ts --headed
// Xem report: npx playwright show-report