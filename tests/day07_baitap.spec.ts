import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';

test('TC025 - Login form visible', async ({ page }) => {
  const lp = new LoginPage(page);
  await lp.goto();
  expect(await lp.isLoginFormVisible()).toBe(true);
});

test('TC026 - Signup redirect', async ({ page }) => {
  const lp = new LoginPage(page);
  await lp.goto();
  await lp.signup('QA User', `qa_${Date.now()}@test.com`);
  await expect(page).toHaveURL(/signup/);
});

test('TC027 - Search products', async ({ page }) => {
  const pp = new ProductsPage(page);
  await pp.goto();
  await pp.searchProduct('top');
  const count = await pp.getProductCount();
  expect(count).toBeGreaterThan(0);
  expect(await pp.isSearchResultVisible()).toBe(true);
});		
