// File: tests/day03.spec.ts
import { test, expect } from '@playwright/test';
// Bài 2.1: Object user
const user = {
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'Test@1234',
};

// Bài 2.2: Array URLs
const pagesToTest = [
  'https://automationexercise.com',
  'https://automationexercise.com/products',
  'https://automationexercise.com/view_cart',
];

// Bài 2.3: Function
async function searchProduct(page: any, keyword: string) {
  await page.goto('https://automationexercise.com/products');
  await page.fill('#search_product', keyword);
  await page.click('#submit_search');
  const results = page.locator('.product-image-wrapper');
  return await results.count();
}
// Bài 2.4: Test gọi function
test('TC006 - Tìm kiếm sản phẩm dress', async ({ page }) => {
  const count = await searchProduct(page, 'dress');
  console.log(`Tìm thấy ${count} kết quả cho 'dress'`);
  await expect(count).toBeGreaterThan(0);
});

// Bài 3: Class HomePage
class HomePage {
  private page: any;
  private url = 'https://automationexercise.com';

  constructor(page: any) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}

test('TC007 - Kiểm tra title qua class', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  const title = await homePage.getTitle();
  expect(title).toBe('Automation Exercise');
});
