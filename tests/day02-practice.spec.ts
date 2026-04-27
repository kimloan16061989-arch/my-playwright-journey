import { test, expect } from '@playwright/test';

// Đây là bài tập Day 02 - Git Basics
test('Day 02 - Git practice', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle(/Google/);
  console.log('✅ Day 02 done!');
});
