import { test, expect } from '@playwright/test';

test('Day 02 - Git practice', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle(/Google/);
  console.log('✅ Day 02 done!');
})
// Đây là bài tập Day 02 - Git Basics (sửa lại)
import { test, expect } from '@playwright/test';