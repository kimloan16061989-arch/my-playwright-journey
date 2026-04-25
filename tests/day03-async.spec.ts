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
  console.log('✅ Test thành công!');
});

test('Thêm sản phẩm vào giỏ hàng (dễ hiểu async/await)', async ({ page }) => {
  // ── BƯỚC 1: Mở trang ──────────────────────────────────────────────────────
  // await = "chờ trang load xong rồi mới làm bước tiếp"
  await page.goto('https://www.saucedemo.com/');

  // ── BƯỚC 2: Đăng nhập ─────────────────────────────────────────────────────
  // Phải CHỜ từng bước gõ và click xong mới qua bước sau
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // ── BƯỚC 3: Xác nhận đã vào trang sản phẩm ────────────────────────────────
  // CHỜ cho đến khi URL chứa "inventory", báo lỗi ngay nếu quá thời gian
  await expect(page).toHaveURL(/inventory/);

  // ── BƯỚC 4: Thêm sản phẩm đầu tiên vào giỏ ───────────────────────────────
  // CHỜ nút "Add to cart" sẵn sàng rồi mới click
  await page.locator('.btn_inventory').nth(1).click();

  // ── BƯỚC 5: Kiểm tra badge giỏ hàng hiện số 1 ────────────────────────────
  // CHỜ element badge xuất hiện và có đúng nội dung "1"
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // ── BƯỚC 6: Mở giỏ hàng ──────────────────────────────────────────────────
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart/);

  // ── BƯỚC 7: Xác nhận giỏ có đúng 1 sản phẩm ─────────────────────────────
  await expect(page.locator('.cart_item')).toHaveCount(1);

  console.log('✅ Thêm vào giỏ hàng thành công!');
});
