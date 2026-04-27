const url = 'https://automationexercise.com'; 
const validEmail = 'testuser@email.com';
const validPassword = 'Test@1234';
// for loop - biết trước số lần lặp
for (let i = 0; i < 3; i++) {
    console.log('Lần thứ: ' + i);
  }
  
  // Ví dụ trong test - check nhiều sản phẩm:
  const products = ['Home', 'Products', 'Cart'];
  for (const product of products) {
    await page.fill('#search', product);
    await page.click('#search-btn');
    await expect(page.locator('.product-name')).toBeVisible();
  }