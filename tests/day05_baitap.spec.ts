import { test, expect } from '@playwright/test';

const BASE = 'https://automationexercise.com';
// Tài khoản test thật - cần tạo trước trên trang này
const EMAIL = 'kimloan1606@gmail.com';
const PASSWORD = 'Loan@0802';

//BT - test trang chủ
test('TC-HP-01 - Test trang chủ', async ({ page }) => {
    // ARRANGE
    await page.goto(BASE);
  
    // ASSERT - kiểm tra thông báo lỗi
    await expect(page).toHaveTitle('Automation Exercise');
  });

//BT- test các link Home, Products, Cart, Signup/Login, Test Cases
  test('TC-HP-02 - Test đủ link', async ({ page }) => {
    // ARRANGE
    await page.goto(BASE);
  
    // ASSERT - kiểm tra thông báo lỗi
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
    // Trang có 2 link tới test cases (nav + footer); name mặc định là substring nên strict mode báo lỗi
    await expect(page.getByRole('link', { name: 'Test Cases', exact: true }),).toBeVisible();
  });

  //BT- test banner/slider hiển thị
  test('TC-HP-03 - Banner/slider hiển thị', async ({ page }) => {
    await page.goto(BASE);
    // Banner carousel có class 'carousel'
    await expect(page.locator('#slider')).toBeVisible();
  });
  
  // ===== BÀI 2: TEST TRANG PRODUCTS =====
    //BT3- test banner/slider hiển thị
    test('TC-PROD-01 - Trang products load đúng', async ({ page }) => {
        await page.goto(BASE + '/products');
        await expect(page).toHaveURL(BASE + '/products');
        const products = page.locator('.product-image-wrapper');
        await expect(products.first()).toBeVisible();
    });
  
        //BT3- test banner/slider hiển thị
    test('TC-PROD-02 - Tìm product TOP', async ({ page }) => {
        await page.goto(BASE + '/products');
        await page.fill('#search_product', 'top');
        await page.click('#submit_search');
        const products = page.locator('.product-image-wrapper');
        const count = await products.count();
        await expect(products).toHaveCount(count);
    });

    test('TC-PROD-03 - Click sản phẩm → xem chi tiết', async ({ page }) => {
        await page.goto(BASE + '/products');
        // Click 'View Product' của sản phẩm đầu tiên
        await page.locator('.choose a').first().click();
        // Kiểm tra có giá hiển thị
        await expect(page.locator('.product-information span span')).toBeVisible();
        // Kiểm tra có nút Add to Cart
        await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
      });

      // sua bai tap